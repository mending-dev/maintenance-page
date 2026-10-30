import siteConfig from '../config/site.config.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function Footer() {
  const { t } = useI18n()
  const links = siteConfig.footer.links.filter((link) => link.href)

  return (
    <footer className="reveal relative z-10 flex flex-col items-center gap-2 px-6 pb-[clamp(8px,2dvh,24px)] pt-2 text-center text-body [--reveal-delay:800ms]">
      {/* Links and copyright share one row to save vertical space */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
        {links.map((link) => (
          <a
            key={link.labelKey}
            href={link.href}
            className="lang-fade text-muted underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
          >
            {t(link.labelKey)}
          </a>
        ))}
        <span className="lang-fade text-dim">{t('footer.copyright')}</span>
      </div>

      <p className="lang-fade max-w-5xl leading-snug text-dim">{t('footer.disclaimer')}</p>
    </footer>
  )
}