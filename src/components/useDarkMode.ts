import { Dark } from 'quasar'

const darkMode = localStorage.getItem('darkMode') || 'auto'

export default function useDarkMode () {
  Dark.set(darkMode !== 'false')
  function toggleDarkMode () {
    Dark.toggle()
    localStorage.setItem('darkMode', String(Dark.isActive))
  }
  return { toggleDarkMode }
}
