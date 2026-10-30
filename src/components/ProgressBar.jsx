import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'

// Number of lit segments that travel through the bar in indeterminate mode
const WINDOW_SIZE = 4

export default function ProgressBar({
  mode = 'indeterminate',
  value = 0,
  segments = 20,
  showPercent = true,
}) {
  const { t } = useI18n()
  const indeterminate = mode === 'indeterminate'
  const [cursor, setCursor] = useState(0)

  // Step-wise movement for the indeterminate "scanner" effect
  useEffect(() => {
    if (!indeterminate) return undefined
    const id = setInterval(() => setCursor((c) => (c + 1) % (segments + WINDOW_SIZE)), 120)
    return () => clearInterval(id)
  }, [indeterminate, segments])

  const percent = Math.min(100, Math.max(0, Number(value) || 0))
  const exact = (percent / 100) * segments
  const full = Math.floor(exact)
  const hasPartial = exact - full > 0 && full < segments

  const stateOf = (index) => {
    if (indeterminate) {
      return index <= cursor && index > cursor - WINDOW_SIZE ? 'full' : 'empty'
    }
    if (index < full) return 'full'
    if (index === full && hasPartial) return 'partial'
    return 'empty'
  }

  const label = indeterminate ? t('progress.working') : t('progress.label')

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-body">
        <span className="text-muted">{label}</span>
        {!indeterminate && showPercent && <span className="text-score">{Math.round(percent)}%</span>}
        {indeterminate && <span className="animate-pixel-blink text-primary">...</span>}
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : Math.round(percent)}
        className="bg-background p-2"
      >
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${segments}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: segments }, (_, index) => (
            <div key={index} className="pixel-seg" data-state={stateOf(index)} />
          ))}
        </div>
      </div>
    </div>
  )
}