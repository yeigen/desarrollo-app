import { rankingFor, type RankingEntry } from './ranking'

const player = (uid: string, points: number, updatedAt = 0): RankingEntry => ({ uid, name: uid, points, updatedAt })

test('ordena por puntos y en empate gana quien llegó primero', () => {
  const ranking = rankingFor([player('ana', 80, 2000), player('luis', 120), player('eva', 80, 1000)], 'luis')

  expect(ranking.map(entry => entry.uid)).toEqual(['luis', 'eva', 'ana'])
})

test('si estás en el top 5 se muestran los 5 primeros', () => {
  const players = [120, 90, 80, 50, 30, 0, 0].map((points, index) => player(`p${index}`, points, index))

  const ranking = rankingFor(players, 'p2')

  expect(ranking.map(entry => entry.position)).toEqual([1, 2, 3, 4, 5])
  expect(ranking.find(entry => entry.isMe)?.position).toBe(3)
})

test('si estás fuera del top 5 apareces con tu posición real frente a los otros 4', () => {
  const players = [120, 90, 80, 50, 30, 20, 0].map((points, index) => player(`p${index}`, points, index))

  const ranking = rankingFor(players, 'p6')

  expect(ranking.map(entry => entry.position)).toEqual([1, 2, 3, 4, 7])
  expect(ranking.at(-1)).toMatchObject({ uid: 'p6', isMe: true })
})
