import { useState } from 'react'
import Boot from './pages/Boot'
import Lock from './pages/Lock'
import Login from './pages/Login'
import Desktop from './pages/Desktop'

function App() {
  const [currentPage, setCurrentPage] = useState('boot')

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
