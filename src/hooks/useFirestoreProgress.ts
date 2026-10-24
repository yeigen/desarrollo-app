import { useCallback, useEffect, useRef, useState } from 'react'
import type { User } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore'
import { completeMission, emptyProgress, isCompleted, mergeProgress, MISSIONS, summarize, type Progress } from '../helpers/missions'
import { notify, requestNotificationPermission } from '../services/notifications'
import { progressDoc, readLocalProgress, uploadProgress, writeLocalProgress } from '../services/progress'

interface ProgressDoc extends Progress {
  name: string
}

const playerName = (user: User) => user.displayName ?? user.email!.split('@')[0]

function completionMessages(progress: Progress, missionId: number) {
  const mission = MISSIONS.find(({ id }) => id === missionId)!
  const messages = [{ title: 'Has completado una misión', body: `${mission.title}: +${mission.points} puntos` }]
  if (summarize(progress).remaining === 1) {
    const pending = MISSIONS.find(({ id }) => !isCompleted(progress, id))!
    messages.push({ title: 'Te falta 1 misión para completar', body: `Solo queda: ${pending.title}` })
  }
  return messages
}

export function useFirestoreProgress(user: User) {
  const [progress, setProgress] = useState(() => readLocalProgress(user.uid) ?? emptyProgress())
  const latest = useRef(progress)

  const keep = useCallback((next: Progress) => {
    latest.current = next
    setProgress(next)
    writeLocalProgress(user.uid, next)
  }, [user.uid])

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  useEffect(() => onSnapshot(progressDoc(user.uid), snapshot => {
    if (!snapshot.exists()) return
    const remote = snapshot.data() as ProgressDoc
    const merged = mergeProgress(latest.current, remote)
    keep(merged)
    if (merged.points !== remote.points) uploadProgress(user.uid, remote.name, merged)
  }), [user.uid, keep])

  const complete = useCallback((missionId: number) => {
    const next = completeMission(latest.current, missionId)
    if (next === latest.current) return
    keep(next)
    uploadProgress(user.uid, playerName(user), next)
    notify(completionMessages(next, missionId))
  }, [user, keep])

  return { name: playerName(user), progress, complete }
}
