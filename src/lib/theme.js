import themeConfig from '../config/theme.config.js'

// primaryDark -> primary-dark
const toKebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

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
}

/** Loads the configured font file via the FontFace API (supports ttf, otf, woff2). */
async function loadFont() {
  const { family, src } = themeConfig.font
  if (!src) return

  const face = new FontFace(family, `url(${src})`)
  const loaded = await face.load()
  document.fonts.add(loaded)
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