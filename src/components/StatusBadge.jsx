import { useI18n } from '../i18n/I18nProvider.jsx'

export default function StatusBadge() {
  const { t } = useI18n()

  return (
    <div className="pixel-box inline-flex items-center gap-3 px-4 py-2 text-body uppercase tracking-wider text-warning">
      <span className="animate-pixel-blink inline-block size-3 bg-warning" aria-hidden="true" />
      {t('status.badge')}
    </div>
  )
}