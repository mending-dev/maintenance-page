import siteConfig from '../config/site.config.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function Footer() {
  const { t } = useI18n()
  const links = siteConfig.footer.links.filter((link) => link.href)

  return (
    <footer className="relative z-10 flex flex-col items-center gap-3 px-6 pb-6 pt-4 text-center text-body">
      {links.length > 0 && (
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.labelKey}
              href={link.href}
              className="text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              {t(link.labelKey)}
            </a>
          ))}
        </nav>
      )}

      <p className="text-dim">{t('footer.copyright')}</p>
      <p className="max-w-xl text-dim">{t('footer.disclaimer')}</p>
    </footer>
  )
}