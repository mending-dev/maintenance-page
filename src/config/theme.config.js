/**
 * Theme configuration.
 * Every value is exposed as a CSS variable (--theme-*) at startup,
 * so Tailwind utilities and custom CSS always use the same source of truth.
 */
const themeConfig = {
  // Base unit for borders, shadows and bevels in px (4 = chunky, 2 = fine)
  pixelSize: 4,

  // Font file lives in /public so the path can be changed without touching code
  font: {
    family: 'Minecraft',
    src: '/fonts/Minecraft-Regular.otf',

    // Number of "font pixels" that fit into one em.
    // Minecraft-Regular.otf = 10, the older Minecraft.ttf = 8
    pixelsPerEm: 10,

    // Screen pixels per font pixel (whole numbers only, otherwise glyphs get blurry).
    // Base font size = pixelsPerEm * scale -> 10 * 2 = 20px
    scale: 2,
  },

  colors: {
    // Brand colors
    primary: '#efbf04',
    primaryDark: '#d8ac04',
    secondary: '#86A8E7',
    accent: '#FF9F43',
    highlight: '#FFFFFF',

    // Text colors
    text: '#D9D9E3',
    muted: '#AAAAAA',
    dim: '#6B7084', // slightly lighter than #555 for better readability

    // State colors
    success: '#84E39F',
    warning: '#FFB347',
    danger: '#F25F5C',
    score: '#FFE066',

    // Surfaces
    background: '#0c0d12',
    surface: '#14161e',
    line: '#262a38',

    // Text color used on top of the primary color (buttons, active states)
    onPrimary: '#1b1500',
  },
}

export default themeConfig