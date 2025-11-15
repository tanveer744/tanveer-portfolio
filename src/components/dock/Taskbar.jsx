import { useState, useEffect } from 'react'
import { useStore } from '@/stores'
import { apps } from '@/config/apps'
import { 
  IoSearchOutline,
  IoWifiSharp,
  IoVolumeHigh,
  IoNotificationsOutline,
  IoBatteryFull,
  IoChevronUp,
  IoLanguageSharp
} from 'react-icons/io5'

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
      {/* Taskbar Background with Windows 11 Acrylic Effect */}
      <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-2xl border-t border-white/10" />
      
      {/* Taskbar Content */}
      <div className="relative h-full flex items-center justify-between px-3">
        
        {/* Left Section - Search Bar */}
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="h-8 w-64 bg-white/10 hover:bg-white/15 transition-all rounded-md flex items-center px-3 gap-2 cursor-text">
            <IoSearchOutline className="w-4 h-4 text-white/70" />
            <span className="text-sm text-white/70 select-none">Search</span>
          </div>
        </div>

        {/* Center Section - Start Button + App Icons */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
          {/* Start Button */}
          <button
            onClick={toggleStartMenu}
            className={`h-10 w-10 rounded-md hover:bg-white/10 active:bg-white/5 transition-all flex items-center justify-center ${
              showStartMenu ? 'bg-white/15' : ''
            }`}
            title="Start"
          >
            <div className="grid grid-cols-2 gap-[2px] w-5 h-5">
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-[1px]" />
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-[1px]" />
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-[1px]" />
              <div className="bg-gradient-to-br from-red-400 to-red-500 rounded-[1px]" />
            </div>
          </button>

          {/* App Icons */}
          {pinnedApps.map((app) => {
            const appWindows = windows.filter(w => w.appId === app.id)
            const isRunning = appWindows.length > 0
            const activeAppWindow = appWindows.find(w => w.id === activeWindow)
            const isActive = activeAppWindow && !activeAppWindow.isMinimized
            
            return (
              <div key={app.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => handleAppClick(app)}
                  className={`h-10 w-10 rounded-md hover:bg-white/10 active:bg-white/5 transition-all flex items-center justify-center ${
                    isActive ? 'bg-white/15' : ''
                  }`}
                  title={app.title}
                >
                  <img src={app.icon} alt={app.title} className="w-5 h-5" />
                </button>
                {/* Running Indicator Dot */}
                {isRunning && (
                  <div 
                    className={`absolute -bottom-1 w-1 h-1 rounded-full transition-all ${
                      isActive ? 'bg-white/90 scale-110' : 'bg-white/50'
                    }`} 
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Right Section - System Tray */}
        <div className="flex items-center gap-1">
          {/* System Tray Icons Group */}
          <div className="flex items-center h-8 px-2 rounded-md hover:bg-white/10 transition-all gap-3">
            {/* Caret Up */}
            <button className="text-white/80 hover:text-white transition-colors" title="Show hidden icons">
              <IoChevronUp className="w-3.5 h-3.5" />
            </button>
            
            {/* Divider */}
            <div className="w-px h-4 bg-white/10" />
            
            {/* WiFi */}
            <button className="text-white/80 hover:text-white transition-colors" title="Network">
              <IoWifiSharp className="w-4 h-4" />
            </button>
            
            {/* Volume */}
            <button className="text-white/80 hover:text-white transition-colors" title="Volume">
              <IoVolumeHigh className="w-4 h-4" />
            </button>
            
            {/* Battery */}
            <button className="text-white/80 hover:text-white transition-colors" title="Battery">
              <IoBatteryFull className="w-5 h-5" />
            </button>
          </div>

          {/* Language Indicator */}
          <button
            className="h-8 px-2 rounded-md hover:bg-white/10 transition-all flex items-center gap-1"
            title="Language preferences"
          >
            <IoLanguageSharp className="w-3.5 h-3.5 text-white/80" />
            <span className="text-xs text-white/80 font-medium">ENG</span>
          </button>

          {/* Date & Time */}
          <button
            className="h-9 px-2.5 rounded-md hover:bg-white/10 transition-all flex flex-col items-center justify-center text-white leading-tight min-w-[70px]"
            title="Date and Time"
          >
            <div className="text-[11px] font-medium">
              {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
            </div>
            <div className="text-[11px] text-white/70">
              {currentTime.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
            </div>
          </button>

          {/* Notification Center */}
          <button
            className="h-8 w-8 rounded-md hover:bg-white/10 transition-all flex items-center justify-center"
            title="Notification Center"
          >
            <IoNotificationsOutline className="w-4 h-4 text-white/80" />
          </button>
        </div>
      </div>
    </div>
  )
}
