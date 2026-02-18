import * as React from 'react'

const STORAGE_KEY = 'darkMode'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  React.useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY)
      if (storedValue !== null) {
        setIsDarkMode(storedValue === 'true')
        return
      }
    } catch {
      // Ignore localStorage errors and fall back to media query.
    }

    setIsDarkMode(
      window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
    )
  }, [])

  const toggleDarkMode = React.useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Ignore localStorage errors (private mode / disabled storage).
      }

      return next
    })
  }, [])

  return {
    isDarkMode,
    toggleDarkMode
  }
}
