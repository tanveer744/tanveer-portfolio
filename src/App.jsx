import { useEffect } from 'react'
import Boot from './pages/Boot'
import Lock from './pages/Lock'
import Login from './pages/Login'
import Desktop from './pages/Desktop'
import { useStore } from '@/stores'

function App() {
  const { currentPage, setCurrentPage, darkMode } = useStore()

  // Apply dark mode to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleBootComplete = () => {
    setCurrentPage('lock')
  }

  const handleLockClick = () => {
    setCurrentPage('login')
  }

  const handleLogin = () => {
    setCurrentPage('desktop')
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      {currentPage === 'boot' && <Boot onComplete={handleBootComplete} />}
      {currentPage === 'lock' && <Lock onClick={handleLockClick} />}
      {currentPage === 'login' && <Login onLogin={handleLogin} />}
      {currentPage === 'desktop' && <Desktop />}
    </div>
  )
}

export default App
