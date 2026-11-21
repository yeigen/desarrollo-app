import type { Coordinates } from './geo'

const COORDINATE_DECIMALS = 6
const FONT_TO_WIDTH = 0.032
const MIN_FONT_PX = 14
const LINE_SPACING = 1.3
const JPEG_QUALITY = 0.9
const BACKGROUND = 'rgba(0, 0, 0, 0.55)'

export function watermarkLines({ lat, lng }: Coordinates, date: Date, address: string) {
  const coordinates = `Lat ${lat.toFixed(COORDINATE_DECIMALS)}, Lng ${lng.toFixed(COORDINATE_DECIMALS)}`
  return [coordinates, date.toLocaleString('es-CO'), address].filter(line => line !== '')
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })

export async function drawWatermark(src: string, lines: string[]) {
  const image = await loadImage(src)
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const context = canvas.getContext('2d')!
  context.drawImage(image, 0, 0)

  const fontSize = Math.max(MIN_FONT_PX, Math.round(canvas.width * FONT_TO_WIDTH))
  const lineHeight = fontSize * LINE_SPACING
  const padding = fontSize
  const boxHeight = lineHeight * lines.length + padding * 2
  const boxTop = canvas.height - boxHeight

  context.fillStyle = BACKGROUND
  context.fillRect(0, boxTop, canvas.width, boxHeight)
  context.fillStyle = '#ffffff'
  context.font = `${fontSize}px sans-serif`
  context.textBaseline = 'top'
  lines.forEach((line, index) => {
    context.fillText(line, padding, boxTop + padding + index * lineHeight, canvas.width - padding * 2)
  })
  return canvas.toDataURL('image/jpeg', JPEG_QUALITY)
}
