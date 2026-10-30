import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import siteConfig from '../config/site.config.js'
import locales from '../config/locales/index.js'

const I18nContext = createContext(null)

const { fallbackLanguage, persist, storageKey } = siteConfig.i18n

// Must match --duration-lang in index.css (fade duration of .lang-fade)
const FADE_MS = 100

const languages = Object.entries(locales).map(([code, locale]) => ({
  code,
  name: locale.name,
  short: locale.short,
}))

// 'de-AT' -> 'de'
const normalize = (tag) => String(tag ?? '').toLowerCase().split(/[-_]/)[0]

/** Order: saved choice -> browser languages -> fallback. */
function detectLanguage() {
  if (persist) {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved && locales[saved]) return saved
    } catch {
      // localStorage may be blocked, ignore
    }
  }

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of candidates) {
    const code = normalize(tag)
    if (locales[code]) return code
  }

  return fallbackLanguage
}

/** Resolves 'a.b.c' inside a nested messages object. */
function resolve(messages, path) {
  return path
    .split('.')
    .reduce((node, key) => (node && typeof node === 'object' ? node[key] : undefined), messages)
}

function interpolate(value, vars) {
  if (typeof value !== 'string') return value
  return value.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`)
}

/** Toggles the fade state used by the .lang-fade elements (see index.css). */
function setSwitching(active) {
  if (active) document.documentElement.dataset.switching = 'true'
  else delete document.documentElement.dataset.switching
}

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(detectLanguage)
  const pendingSwitch = useRef(null)

  // Clean up a running switch if the provider unmounts
  useEffect(() => () => clearTimeout(pendingSwitch.current), [])

  /**
   * Smooth language switch:
   * 1) fade the texts out, 2) swap the language while they are invisible,
   * 3) fade the new texts in.
   */
  const setLanguage = useCallback(
    (code) => {
      if (!locales[code]) return

      clearTimeout(pendingSwitch.current)

      // Clicking the current language while a switch is pending cancels that switch
      if (code === language) {
        setSwitching(false)
        return
      }

      setSwitching(true)

      pendingSwitch.current = setTimeout(() => {
        setLanguageState(code)

        if (persist) {
          try {
            localStorage.setItem(storageKey, code)
          } catch {
            // ignore
          }
        }

        // Wait two frames so React has rendered the new texts before fading in
        requestAnimationFrame(() => requestAnimationFrame(() => setSwitching(false)))
      }, FADE_MS)
    },
    [language],
  )

  /**
   * Translates a key. Lookup order: current language -> fallback language -> key itself.
   * Arrays (e.g. tips.items) are returned as they are.
   */
  const t = useCallback(
    (key, vars = {}) => {
      const defaults = { name: siteConfig.name, year: new Date().getFullYear() }
      const merged = { ...defaults, ...vars }

      const value =
        resolve(locales[language]?.messages, key) ??
        resolve(locales[fallbackLanguage]?.messages, key) ??
        key

      return interpolate(value, merged)
    },
    [language],
  )

  // Keep <html lang>, title and description in sync with the active language
  useEffect(() => {
    document.documentElement.lang = language
    document.title = t('meta.title')

    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t('meta.description'))
  }, [language, t])

  const value = useMemo(
    () => ({ language, setLanguage, languages, t }),
    [language, setLanguage, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside <I18nProvider>')
  return context
}