import { completeMission, emptyProgress, isUnlocked, mergeProgress, PHOTO_MISSION, STILL_MISSION, summarize, WALK_MISSION } from './missions'

test('completar una misión suma sus puntos y no los repite si se completa otra vez', () => {
  const once = completeMission(emptyProgress(), WALK_MISSION.id)
  const twice = completeMission(once, WALK_MISSION.id)

  expect(once.points).toBe(WALK_MISSION.points)
  expect(twice.points).toBe(WALK_MISSION.points)
})

test('el progreso se guarda con el formato del enunciado', () => {
  expect(completeMission(emptyProgress(), PHOTO_MISSION.id)).toEqual({
    points: PHOTO_MISSION.points,
    missions: [
      { id: PHOTO_MISSION.id, completed: true },
      { id: WALK_MISSION.id, completed: false },
      { id: STILL_MISSION.id, completed: false },
    ],
  })
})

test('la permanencia se habilita solo después del movimiento', () => {
  const afterPhoto = completeMission(emptyProgress(), PHOTO_MISSION.id)
  const afterWalk = completeMission(afterPhoto, WALK_MISSION.id)

  expect(isUnlocked(afterPhoto, STILL_MISSION.id)).toBe(false)
  expect(isUnlocked(afterWalk, STILL_MISSION.id)).toBe(true)
})

test('al unir la copia local con la de Firebase no se pierde ninguna misión completada', () => {
  const local = completeMission(emptyProgress(), PHOTO_MISSION.id)
  const remote = { ...completeMission(emptyProgress(), WALK_MISSION.id), points: 999 }

  const merged = mergeProgress(local, remote)

  expect(summarize(merged).completed).toBe(2)
  expect(merged.points).toBe(PHOTO_MISSION.points + WALK_MISSION.points)
})

test('el resumen da el porcentaje, lo que falta y el estado general', () => {
  const twoDone = completeMission(completeMission(emptyProgress(), PHOTO_MISSION.id), WALK_MISSION.id)
  const allDone = completeMission(twoDone, STILL_MISSION.id)

  expect(summarize(emptyProgress())).toMatchObject({ percent: 0, remaining: 3, status: 'Sin empezar' })
  expect(summarize(twoDone)).toMatchObject({ percent: 67, remaining: 1, status: 'En progreso' })
  expect(summarize(allDone)).toMatchObject({ percent: 100, remaining: 0, status: 'Completado' })
})
