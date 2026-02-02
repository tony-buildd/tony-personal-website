import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import * as React from 'react'

import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

export function DarkModeToggle() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleDarkMode = React.useCallback(
    (e: any) => {
      e.preventDefault()
      toggleDarkMode()
    },
    [toggleDarkMode]
  )

  if (!hasMounted) {
    return null
  }

  return (
    <a
      className={styles.darkModeToggle}
      href='#'
      role='button'
      onClick={onToggleDarkMode}
      title='Toggle dark mode'
    >
      {isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </a>
  )
}
