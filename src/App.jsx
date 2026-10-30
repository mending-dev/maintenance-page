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

/*
 * Entrance order (stagger via --reveal-delay):
 * badge 0 -> logo 100 -> title 200 -> slogan 300 -> description 400
 * -> progress 500 -> buttons 600 -> tips 700 -> footer 800
 * (badge, logo, tips and footer set their own delay inside their components)
 */
export default function App() {
  const { t } = useI18n()
  const buttons = siteConfig.buttons.filter((button) => button.href)

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <Background />

      {/* On sm+ the switcher floats in the corner and takes no vertical space */}
      <header className="reveal relative z-10 flex justify-end px-6 pt-6 [--reveal-delay:900ms] sm:absolute sm:right-0 sm:top-0 sm:z-20">
        <LanguageSwitcher />
      </header>

      {/* Vertical gaps scale with the viewport height (dvh) so the page fits on one screen */}
      <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-[clamp(12px,2.8dvh,32px)] px-6 py-[clamp(8px,2dvh,32px)] text-center">
        <StatusBadge />

        <Logo />

        <div className="flex flex-col items-center gap-[clamp(8px,1.6dvh,16px)]">
          {/* trim-cap-top removes the empty font space above the letters,
              so the gap between logo and title is measured to the visible text */}
          <h1 className="reveal lang-fade pixel-title trim-cap-top text-title [--reveal-delay:200ms] sm:text-hero short:text-title">
            {t('maintenance.title')}
          </h1>
          <p className="reveal lang-fade text-body text-content [--reveal-delay:300ms] sm:text-lead">
            {t('maintenance.slogan')}
          </p>
          {/* Optional content: hidden on very short viewports */}
          <p className="reveal lang-fade max-w-xl text-body leading-relaxed text-muted [--reveal-delay:400ms] tiny:hidden">
            {t('maintenance.description')}
          </p>
        </div>

        <section className="reveal pixel-box w-full max-w-xl p-6 [--reveal-delay:500ms] short:p-4">
          <ProgressBar {...siteConfig.progress} />
        </section>

        {buttons.length > 0 && (
          <div className="reveal flex flex-col items-center gap-6 [--reveal-delay:600ms] sm:flex-row">
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