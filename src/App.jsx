import siteConfig from './config/site.config.js'
import { useI18n } from './i18n/I18nProvider.jsx'
import Background from './components/Background.jsx'
import Footer from './components/Footer.jsx'
import LanguageSwitcher from './components/LanguageSwitcher.jsx'
import Logo from './components/Logo.jsx'
import PixelButton from './components/PixelButton.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import StatusBadge from './components/StatusBadge.jsx'
import Tips from './components/Tips.jsx'

export default function App() {
  const { t } = useI18n()
  const buttons = siteConfig.buttons.filter((button) => button.href)

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <Background />

      <header className="relative z-10 flex justify-end px-6 pt-6">
        <LanguageSwitcher />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-6 py-8 text-center">
        <StatusBadge />

        <Logo />

        <div className="flex flex-col items-center gap-4">
          <h1 className="pixel-title text-title leading-tight sm:text-hero">
            {t('maintenance.title')}
          </h1>
          <p className="text-body text-content sm:text-lead">{t('maintenance.slogan')}</p>
          <p className="max-w-xl text-body leading-relaxed text-muted">
            {t('maintenance.description')}
          </p>
        </div>

        <section className="pixel-box w-full max-w-xl p-6">
          <ProgressBar {...siteConfig.progress} />
        </section>

        {buttons.length > 0 && (
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            {buttons.map((button) => (
              <PixelButton key={button.id} href={button.href} variant={button.variant} icon={button.icon}>
                {t(button.labelKey)}
              </PixelButton>
            ))}
          </div>
        )}

        <Tips />
      </main>

      <Footer />
    </div>
  )
}