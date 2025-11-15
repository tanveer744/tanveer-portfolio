import { useState, useEffect } from 'react'
import { useStore } from '@/stores'
import { apps } from '@/config/apps'
import { formatTime } from '@/utils'

export default function Taskbar() {
  const { showStartMenu, toggleStartMenu, windows, addWindow, setActiveWindow, restoreWindow, minimizeWindow, activeWindow } = useStore()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAppClick = (app) => {
    // If it's an external link, open it
    if (app.link) {
      window.open(app.link, '_blank')
      return
    }

    // Check if app is already open
    const existingWindow = windows.find(w => w.appId === app.id)
    
    if (existingWindow) {
      // If minimized, restore it
      if (existingWindow.isMinimized) {
        restoreWindow(existingWindow.id)
      } 
      // If already active, minimize it
      else if (activeWindow === existingWindow.id) {
        minimizeWindow(existingWindow.id)
      }
      // Otherwise, just focus it
      else {
        setActiveWindow(existingWindow.id)
      }
    } else {
      // Open new window
      const newWindow = {
        id: `${app.id}-${Date.now()}`,
        appId: app.id,
        title: app.title,
        icon: app.icon,
        width: app.width,
        height: app.height,
        x: 100 + windows.length * 30,
        y: 50 + windows.length * 30,
        minimized: false,
        maximized: false,
      }
      addWindow(newWindow)
    }
  }

  const pinnedApps = apps.filter(app => app.desktop || app.link) // Show desktop apps and links

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 z-50">
      {/* Taskbar Background with Acrylic Effect */}
      <div className="absolute inset-0 acrylic border-t border-white/10" />
      
      {/* Taskbar Content */}
      <div className="relative h-full flex items-center justify-between px-2">
        
        {/* Left Section - Start Button */}
        <div className="flex items-center gap-1">
          {/* Start Button */}
          <button
            onClick={toggleStartMenu}
            className={`h-10 px-3 rounded hover:bg-white/10 active:bg-white/5 transition-all flex items-center justify-center ${
              showStartMenu ? 'bg-white/10' : ''
            }`}
            title="Start"
          >
            <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
              <div className="bg-blue-400 rounded-[1px]" />
              <div className="bg-green-400 rounded-[1px]" />
              <div className="bg-yellow-400 rounded-[1px]" />
              <div className="bg-red-400 rounded-[1px]" />
            </div>
          </button>
        </div>

        {/* Center Section - Pinned & Running Apps */}
        <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {pinnedApps.map((app) => {
            const appWindows = windows.filter(w => w.appId === app.id)
            const isRunning = appWindows.length > 0
            const activeAppWindow = appWindows.find(w => w.id === activeWindow)
            const isActive = activeAppWindow && !activeAppWindow.isMinimized
            
            return (
              <button
                key={app.id}
                onClick={() => handleAppClick(app)}
                className={`h-10 w-10 rounded hover:bg-white/10 active:bg-white/5 transition-all flex items-center justify-center relative ${
                  isActive ? 'bg-white/10' : isRunning ? 'bg-white/5' : ''
                }`}
                title={app.title}
              >
                <img src={app.icon} alt={app.title} className="w-6 h-6" />
                {/* Running indicator */}
                {isRunning && (
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all ${
                    isActive ? 'w-4 bg-win-accent' : 'w-1 bg-white/50'
                  }`} />
                )}
              </button>
            )
          })}
        </div>

        {/* Right Section - System Tray */}
        <div className="flex items-center gap-2">
          {/* System Icons */}
          <button
            className="h-8 px-2 rounded hover:bg-white/10 active:bg-white/5 transition-all flex items-center gap-1 text-white text-xs"
            title="Network"
          >
            📶
          </button>
          
          <button
            className="h-8 px-2 rounded hover:bg-white/10 active:bg-white/5 transition-all flex items-center gap-1 text-white text-xs"
            title="Sound"
          >
            🔊
          </button>

          <button
            className="h-8 px-2 rounded hover:bg-white/10 active:bg-white/5 transition-all flex items-center gap-1 text-white text-xs"
            title="Battery"
          >
            🔋
          </button>

          {/* Date & Time */}
          <button
            className="h-10 px-3 rounded hover:bg-white/10 active:bg-white/5 transition-all flex flex-col items-end justify-center text-white text-xs leading-tight"
            title="Date and Time"
          >
            <div className="font-medium">{formatTime(currentTime)}</div>
            <div className="opacity-70">{currentTime.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</div>
          </button>

          {/* Notification Center */}
          <button
            className="h-10 px-3 rounded hover:bg-white/10 active:bg-white/5 transition-all flex items-center justify-center text-white"
            title="Notifications"
          >
            🔔
          </button>
        </div>
      </div>
    </div>
  )
}
