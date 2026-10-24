export interface MissionProgress {
  id: number
  completed: boolean
}

export interface Progress {
  points: number
  missions: MissionProgress[]
}

export const MIN_DISTANCE_METERS = 30
export const STILL_SECONDS = 10

export const PHOTO_MISSION = {
  id: 1,
  title: 'Evidencia',
  description: 'Toma una foto con la cámara y guárdala.',
  points: 30,
}

export const WALK_MISSION = {
  id: 2,
  title: 'Movimiento real',
  description: `Aléjate más de ${MIN_DISTANCE_METERS} m de tu posición original.`,
  points: 50,
}

export const STILL_MISSION = {
  id: 3,
  title: 'Permanencia activa',
  description: `Quédate quieto ${STILL_SECONDS} segundos hasta que el celular vibre.`,
  points: 40,
}

export const MISSIONS = [PHOTO_MISSION, WALK_MISSION, STILL_MISSION]

export function isCompleted(progress: Progress, id: number) {
  return progress.missions.some(mission => mission.id === id && mission.completed)
}

function withMissions(isDone: (id: number) => boolean): Progress {
  const missions = MISSIONS.map(({ id }) => ({ id, completed: isDone(id) }))
  const points = MISSIONS.filter(({ id }) => isDone(id)).reduce((total, mission) => total + mission.points, 0)
  return { points, missions }
}

export function emptyProgress() {
  return withMissions(() => false)
}

export function completeMission(progress: Progress, id: number) {
  if (isCompleted(progress, id)) return progress
  return withMissions(missionId => missionId === id || isCompleted(progress, missionId))
}

export function mergeProgress(local: Progress, remote: Progress) {
  return withMissions(id => isCompleted(local, id) || isCompleted(remote, id))
}

export function isUnlocked(progress: Progress, id: number) {
  return id !== STILL_MISSION.id || isCompleted(progress, WALK_MISSION.id)
}

export function summarize(progress: Progress) {
  const total = MISSIONS.length
  const completed = MISSIONS.filter(({ id }) => isCompleted(progress, id)).length
  let status = 'En progreso'
  if (completed === 0) status = 'Sin empezar'
  if (completed === total) status = 'Completado'
  return { completed, total, remaining: total - completed, percent: Math.round((completed / total) * 100), status }
}
