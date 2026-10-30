import { useI18n } from '../i18n/I18nProvider.jsx'

export default function StatusBadge() {
  const { t } = useI18n()

  return (
    // mb = pixel size: the notched border sticks out below the box by one pixel unit,
    // this keeps the visible gap to the logo equal to the other gaps
    <div className="reveal pixel-box mb-[var(--theme-pixel)] inline-flex items-center gap-3 px-4 py-2 text-body uppercase tracking-wider text-warning [--reveal-delay:0ms]">
      <span className="animate-pixel-blink inline-block size-3 bg-warning" aria-hidden="true" />
      <span className="lang-fade">{t('status.badge')}</span>
    </div>
  )
}