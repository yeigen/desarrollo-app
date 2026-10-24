import { withSupabase } from 'npm:@supabase/server@1.9.2'
import type { SupabaseClient } from 'npm:@supabase/supabase-js@2.118.0'
import { JWT } from 'npm:google-auth-library@10.9.1'

interface ServiceAccount {
  project_id: string
  client_email: string
  private_key: string
}

type PushEvent = { type: 'invite'; memberId: string } | { type: 'item'; ownerId: string; offerKey: string }

interface Message {
  recipients: string[]
  title: string
  body: string
  ownerId: string
}

const FCM_NOT_FOUND = 404

const serviceAccount: ServiceAccount = JSON.parse(Deno.env.get('FCM_SERVICE_ACCOUNT')!)

const firstName = (name: string) => name.split(' ')[0]

async function inviteMessage(supabase: SupabaseClient, actorId: string, memberId: string): Promise<Message | null> {
  const [member, actor] = await Promise.all([
    supabase.from('budget_members').select('member_id').eq('owner_id', actorId).eq('member_id', memberId).maybeSingle(),
    supabase.from('profiles').select('name').eq('id', actorId).single(),
  ])
  if (!member.data || !actor.data) return null
  return {
    recipients: [memberId],
    title: 'Te compartieron un presupuesto',
    body: `${actor.data.name} compartió su presupuesto contigo.`,
    ownerId: actorId,
  }
}

async function itemMessage(supabase: SupabaseClient, actorId: string, ownerId: string, offerKey: string): Promise<Message | null> {
  const [item, owner, actor, members] = await Promise.all([
    supabase.from('budget_items').select('offer').eq('owner_id', ownerId).eq('offer_key', offerKey).maybeSingle(),
    supabase.from('profiles').select('name').eq('id', ownerId).single(),
    supabase.from('profiles').select('name').eq('id', actorId).single(),
    supabase.from('budget_members').select('member_id').eq('owner_id', ownerId),
  ])
  if (!item.data || !owner.data || !actor.data) return null
  const people = [ownerId, ...(members.data ?? []).map((row) => row.member_id)]
  return {
    recipients: people.filter((id) => id !== actorId),
    title: `Presupuesto de ${firstName(owner.data.name)}`,
    body: `${firstName(actor.data.name)} agregó ${item.data.offer.name}.`,
    ownerId,
  }
}

async function fcmAccessToken() {
  const client = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  })
  const { access_token } = await client.authorize()
  return access_token!
}

function sendToDevice(token: string, message: Message, accessToken: string) {
  return fetch(`https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      message: {
        token,
        notification: { title: message.title, body: message.body },
        data: { ownerId: message.ownerId },
      },
    }),
  })
}

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    const event: PushEvent = await req.json()
    const actorId = ctx.userClaims!.id
    const message =
      event.type === 'invite'
        ? await inviteMessage(ctx.supabase, actorId, event.memberId)
        : event.type === 'item'
          ? await itemMessage(ctx.supabase, actorId, event.ownerId, event.offerKey)
          : null
    if (!message) return Response.json({ error: 'Evento no válido o sin acceso' }, { status: 400 })

    const { data: tokens } = await ctx.supabaseAdmin.from('push_tokens').select('token').in('user_id', message.recipients)
    if (!tokens?.length) return Response.json({ sent: 0 })

    const accessToken = await fcmAccessToken()
    const responses = await Promise.all(tokens.map(({ token }) => sendToDevice(token, message, accessToken)))
    const expired = tokens.filter((_, index) => responses[index].status === FCM_NOT_FOUND).map(({ token }) => token)
    if (expired.length) await ctx.supabaseAdmin.from('push_tokens').delete().in('token', expired)

    return Response.json({ sent: responses.filter((response) => response.ok).length, expired: expired.length })
  }),
}
