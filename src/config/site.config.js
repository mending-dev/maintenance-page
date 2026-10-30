/**
 * Site configuration.
 * Everything that is project specific (name, links, images, behavior)
 * lives here. Texts are defined in ./locales.
 */
const siteConfig = {
  // Used for the logo fallback, page title and footer
  name: 'MyServer',

  logo: {
    src: '/images/logo.png',
    alt: 'MyServer',
    width: 320, // use an integer multiple of the original size for crisp pixels
    animate: true, // gentle pixel bobbing
  },

  i18n: {
    fallbackLanguage: 'en',
    persist: true, // remember the manual language choice
    storageKey: 'maintenance-language',
  },

  progress: {
    // 'indeterminate' = animated, no percentage (finish date unknown)
    // 'fixed'         = shows the value below
    mode: 'indeterminate',
    value: 35, // 0-100, only used in 'fixed' mode
    segments: 20,
    showPercent: true,
  },

  // Buttons without an href are not rendered.
  // variant: 'primary' | 'secondary' | 'accent' | 'ghost'
  // icon:    'apply' | 'discord' | '' (see PixelIcon.jsx)
  buttons: [
    {
      id: 'apply',
      labelKey: 'buttons.apply',
      href: 'https://example.com/apply',
      variant: 'primary',
      icon: 'apply',
    },
    {
      id: 'discord',
      labelKey: 'buttons.discord',
      href: 'https://discord.gg/your-invite',
      variant: 'secondary',
      icon: 'discord',
    },
  ],

  // Rotating tips below the buttons (texts: tips.items in the locale files)
  tips: {
    enabled: true,
    intervalMs: 7000,
  },

  background: {
    image: '', // optional background image path, e.g. '/images/bg.png'
    grid: true,
    glow: true,
    particles: 28, // floating pixels, 0 to disable
  },

  footer: {
    // Links without an href are not rendered
    links: [
      { labelKey: 'footer.imprint', href: '' },
      { labelKey: 'footer.privacy', href: '' },
    ],
  },
}

export default siteConfig