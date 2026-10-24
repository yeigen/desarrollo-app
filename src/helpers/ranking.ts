export interface RankingEntry {
  uid: string
  name: string
  points: number
  updatedAt: number
}

const TOP_SIZE = 5

export function rankingFor(entries: RankingEntry[], uid: string) {
  const ranked = [...entries]
    .sort((first, second) => second.points - first.points || first.updatedAt - second.updatedAt)
    .map((entry, index) => ({ ...entry, position: index + 1, isMe: entry.uid === uid }))
  const me = ranked.find(entry => entry.isMe)
  if (!me || me.position <= TOP_SIZE) return ranked.slice(0, TOP_SIZE)
  return [...ranked.slice(0, TOP_SIZE - 1), me]
}
