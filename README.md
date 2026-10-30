# Maintenance Page

A minimal, pixel-styled maintenance page for Minecraft servers, built with **React (Vite)** and **Tailwind CSS v4**.
Everything (theme, texts, links, image paths) is configurable, so it can be reused for any project.

## Features

- Pixel / Minecraft look with a modern feel (custom font, bevelled buttons, pixel borders)
- Pixel logo, slogan, status badge, progress bar, two buttons (Apply and Discord), rotating tips and footer
- Progress bar with a fixed value or an indeterminate "work in progress" animation (no countdown needed)
- Multi-language: browser language is detected, English is the fallback, German and English included
- Smooth UI: staggered fade-in on load, soft hover effects, animated language switch, hidden scrollbar
- Fits on one screen: optional content is hidden automatically on short viewports
- Respects `prefers-reduced-motion`

## Getting started

```bash
npm install
npm run dev       # development server
npm run build     # production build in dist/
npm run preview   # preview the production build
```

Add your assets to `public/`:

| File                               | Purpose                         |
| ---------------------------------- | ------------------------------- |
| `public/fonts/Minecraft-Regular.otf` | Pixel font                      |
| `public/images/logo.png`           | Logo (cropped, pixel art)       |
| `public/favicon.png`               | Favicon                         |

## Configuration

| File                         | What it controls                                                        |
| ---------------------------- | ----------------------------------------------------------------------- |
| `src/config/site.config.js`  | Name, logo, links, buttons, progress, tips, background, footer links    |
| `src/config/theme.config.js` | Colors, pixel size, font file and font grid                             |
| `src/config/locales/*.js`    | All texts per language (`de.js`, `en.js`)                               |

### Common tasks

**Show a fixed progress value**
In `site.config.js` set `progress.mode` to `'fixed'` and `progress.value` to `0` - `100`.

**Add a language**
Create `src/config/locales/fr.js` (copy `en.js`) and register it in `src/config/locales/index.js`.

**Change buttons or links**
Edit the `buttons` array in `site.config.js`. Buttons without an `href` are not rendered; the same applies to footer links.

**Use another font**
Put the file into `public/fonts/` and update `theme.config.js`:

```js
font: {
  family: 'Minecraft',
  src: '/fonts/Minecraft-Regular.otf',
  pixelsPerEm: 10, // pixel grid of the font (Minecraft-Regular.otf = 10)
  scale: 2,        // screen pixels per font pixel, whole numbers only
}
```

Pixel fonts are only crisp at multiples of their grid, so all font sizes derive from these two values
(`text-body`, `text-lead`, `text-title`, `text-hero`, `text-display`). Avoid arbitrary sizes like `text-[18px]`.

## Project structure

```
public/            fonts, images, favicon
src/
  config/          site, theme and locale files
  i18n/            language detection, translations, smooth language switch
  lib/theme.js     applies theme variables, loads and measures the font
  components/      Logo, ProgressBar, PixelButton, Tips, Footer, ...
  index.css        Tailwind setup, pixel components, animations
```

## Deployment

`npm run build` creates a static site in `dist/`. Serve it with any web server (nginx, Apache, Caddy)
or static host. Make sure the maintenance page is returned with HTTP status `503` if search engines should not index it.

## Disclaimer

Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.