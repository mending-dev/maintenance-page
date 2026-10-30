import { useEffect, useState } from 'react'
import siteConfig from '../config/site.config.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

/** Rotating "loading screen" style tips. Hidden on short viewports ("short" variant). */
export default function Tips() {
  const { t } = useI18n()
  const { enabled, intervalMs } = siteConfig.tips

  const items = t('tips.items')
  const count = Array.isArray(items) ? items.length : 0
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!enabled || count < 2) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs)
    return () => clearInterval(id)
  }, [enabled, count, intervalMs])

  if (!enabled || count === 0) return null

  return (
    // The wrapper handles entrance + hiding, the keyed paragraph fades on every tip change
    <div className="reveal max-w-xl [--reveal-delay:700ms] short:hidden">
      {/* min-h in em reserves two lines so the layout does not jump between tips */}
      <p key={index} className="tip-fade lang-fade min-h-[3.5em] text-body leading-relaxed text-secondary">
        <span className="text-primary">{t('tips.label')}:</span> {items[index % count]}
      </p>
    </div>
  )
}