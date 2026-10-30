import themeConfig from '../config/theme.config.js'

// primaryDark -> primary-dark
const toKebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

// Used until the real font has been measured (values in em)
const FALLBACK_METRICS = { ascent: 1, descent: 0.2, cap: 0.7 }

/**
 * Measures the vertical metrics of the loaded font in em:
 *  - ascent / descent: what the browser uses for the line box
 *  - cap: height of capital letters
 * Measuring at runtime avoids hardcoding values, because browsers pick
 * different metric tables (hhea vs. typo) for some fonts.
 */
function measureFontMetrics() {
  try {
    const size = 100
    const ctx = document.createElement('canvas').getContext('2d')
    ctx.font = `${size}px "${themeConfig.font.family}"`

    const metrics = ctx.measureText('H')
    const ascent = metrics.fontBoundingBoxAscent / size
    const descent = metrics.fontBoundingBoxDescent / size
    const cap = metrics.actualBoundingBoxAscent / size

    if ([ascent, descent, cap].every((value) => Number.isFinite(value) && value > 0)) {
      return { ascent, descent, cap }
    }
  } catch {
    // canvas not available, use fallback
  }
  return FALLBACK_METRICS
}

/** Exposes the font metrics as unitless CSS variables (em based). */
function applyFontMetrics(metrics) {
  const root = document.documentElement
  root.style.setProperty('--theme-font-ascent', String(metrics.ascent))
  root.style.setProperty('--theme-font-descent', String(metrics.descent))
  root.style.setProperty('--theme-font-cap', String(metrics.cap))
}

/** Writes all theme values as CSS variables on :root. */
export function applyThemeVariables() {
  const root = document.documentElement
  const { font, pixelSize, colors } = themeConfig

  for (const [name, value] of Object.entries(colors)) {
    root.style.setProperty(`--theme-${toKebab(name)}`, value)
  }

  root.style.setProperty('--theme-pixel', `${pixelSize}px`)
  root.style.setProperty('--theme-font', `"${font.family}"`)

  // Base font size aligned to the font's pixel grid (e.g. 10 * 2 = 20px)
  root.style.setProperty('--theme-font-base', `${font.pixelsPerEm * font.scale}px`)

  applyFontMetrics(FALLBACK_METRICS)
}

/** Loads the configured font file via the FontFace API (supports ttf, otf, woff2). */
async function loadFont() {
  const { family, src } = themeConfig.font
  if (!src) return

  const face = new FontFace(family, `url(${src})`)
  const loaded = await face.load()
  document.fonts.add(loaded)

  // Re-measure as soon as the real font is available (also if it arrives after the timeout)
  applyFontMetrics(measureFontMetrics())
}

/**
 * Applies the theme and waits for the font (max. 2s),
 * so the first paint already uses the pixel font.
 */
export async function initTheme() {
  applyThemeVariables()

  try {
    await Promise.race([loadFont(), new Promise((resolve) => setTimeout(resolve, 2000))])
  } catch (error) {
    console.warn('[theme] Could not load font, using fallback.', error)
  }
}