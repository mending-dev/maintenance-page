import { useI18n } from '../i18n/I18nProvider.jsx'

export default function LanguageSwitcher() {
  const { language, setLanguage, languages } = useI18n()

  // Nothing to switch if there is only one language
  if (languages.length < 2) return null

  return (
    <div role="group" aria-label="Language" className="flex gap-3">
      {languages.map(({ code, name, short }) => {
        const active = code === language
        return (
          <button
            key={code}
            type="button"
            title={name}
            aria-pressed={active}
            onClick={() => setLanguage(code)}
            // Smooth color change plus a small lift on hover and a press on click
            className={`pixel-box cursor-pointer px-3 py-1 text-body transition-[background-color,color,translate] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0.5 ${
              active ? 'bg-primary text-on-primary' : 'text-muted hover:text-content'
            }`}
          >
            {short}
          </button>
        )
      })}
    </div>
  )
}