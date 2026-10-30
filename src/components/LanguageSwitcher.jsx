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
            className={`pixel-box cursor-pointer px-3 py-1 text-body transition-colors ${
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