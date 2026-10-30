/**
 * Pixel icons defined as bitmaps: 'X' = filled pixel, '.' = empty.
 * Add your own by adding a new entry; icons use currentColor.
 */
const ICONS = {
  discord: [
    '.XX.....XX.',
    'XXXXXXXXXXX',
    'XXXXXXXXXXX',
    'XX..XXX..XX',
    'XX..XXX..XX',
    'XXXXXXXXXXX',
    '.XXXXXXXXX.',
    '..XX...XX..',
  ],
  apply: [
    '.......XX',
    '......XXX',
    '.....XXX.',
    '....XXX..',
    '.X.XXX...',
    '.XXXX....',
    '..XX.....',
    '.X.XX....',
    'X...X....',
  ],
}

export default function PixelIcon({ name, size = 3 }) {
  const rows = ICONS[name]
  if (!rows) return null

  const width = rows[0].length
  const height = rows.length

  const rects = []
  rows.forEach((row, y) => {
    ;[...row].forEach((cell, x) => {
      if (cell === 'X') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)
    })
  })

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * size}
      height={height * size}
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects}
    </svg>
  )
}