import de from './de.js'
import en from './en.js'

/**
 * Language registry.
 * To add a language: create a new file (e.g. fr.js) and register it here.
 *   name  -> shown as tooltip in the language switcher
 *   short -> label of the switcher button
 */
const locales = {
  en: { name: 'English', short: 'EN', messages: en },
  de: { name: 'Deutsch', short: 'DE', messages: de },
}

export default locales