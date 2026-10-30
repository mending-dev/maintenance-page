import { useMemo } from 'react'
import siteConfig from '../config/site.config.js'

/** Tiny seeded PRNG so the particles are stable between renders. */
function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const PARTICLE_COLORS = [
  'var(--theme-primary)',
  'var(--theme-secondary)',
  'var(--theme-accent)',
  'var(--theme-score)',
]
const PARTICLE_SIZES = [4, 8, 8, 12]

export default function Background() {
  const { image, grid, glow, particles } = siteConfig.background

  const items = useMemo(() => {
    const rand = mulberry32(42)
    return Array.from({ length: particles }, (_, id) => ({
      id,
      left: `${Math.round(rand() * 100)}%`,
      size: PARTICLE_SIZES[Math.floor(rand() * PARTICLE_SIZES.length)],
      color: PARTICLE_COLORS[Math.floor(rand() * PARTICLE_COLORS.length)],
      duration: 14 + rand() * 18,
      delay: -rand() * 30, // negative delay = particles are already spread out on load
      opacity: 0.25 + rand() * 0.4,
    }))
  }, [particles])

  return (
    // fade-in: the whole background eases in slowly while the content reveals on top
    <div className="fade-in pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-background/80" />
        </>
      )}

      {grid && <div className="bg-grid absolute inset-0" />}
      {glow && <div className="bg-glow absolute inset-0" />}

      {items.map((p) => (
        <span
          key={p.id}
          className="pixel-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--p-opacity': p.opacity,
          }}
        />
      ))}
    </div>
  )
}