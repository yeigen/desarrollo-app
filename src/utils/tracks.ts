import { pathLengthInMeters, type TrackPoint } from './geo'

const TRACK_FILE = /^recorrido-(\d{4}-\d{2}-\d{2})\.json$/

export interface Session {
  startedAt: number
  points: TrackPoint[]
}

export function dayKey(time: number) {
  const date = new Date(time)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export const trackFileName = (day: string) => `recorrido-${day}.json`

export function savedDays(fileNames: string[]) {
  return fileNames
    .map(name => TRACK_FILE.exec(name)?.[1])
    .filter(day => day !== undefined)
    .sort()
    .reverse()
}

export function appendPoint(sessions: Session[], startedAt: number, point: TrackPoint): Session[] {
  if (!sessions.some(session => session.startedAt === startedAt)) {
    return [...sessions, { startedAt, points: [point] }]
  }
  return sessions.map(session =>
    session.startedAt === startedAt ? { ...session, points: [...session.points, point] } : session,
  )
}

export function summarizeDay(sessions: Session[]) {
  return sessions.reduce(
    (summary, { points }) => ({
      distance: summary.distance + pathLengthInMeters(points),
      durationMs: summary.durationMs + (points.length ? points[points.length - 1].time - points[0].time : 0),
      points: summary.points + points.length,
    }),
    { distance: 0, durationMs: 0, points: 0 },
  )
}
