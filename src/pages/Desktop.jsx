import { useEffect } from 'react'
import { useStore } from '@/stores'
import Taskbar from '@/components/dock/Taskbar'
import StartMenu from '@/components/StartMenu'
import AppWindow from '@/components/AppWindow'
import DesktopIcons from '@/components/desktop/DesktopIcons'
import { wallpapers } from '@/config/wallpapers'
import { apps } from '@/config/apps'

export default function Desktop() {
  const { windows, showStartMenu, addWindow } = useStore()

  // Initialize apps that should show on startup
  useEffect(() => {
    apps.forEach((app) => {
      if (app.show && app.desktop) {
        const newWindow = {
          id: `${app.id}-${Date.now()}`,
          appId: app.id,
          title: app.title,
          icon: app.icon,
          width: app.width,
          height: app.height,
          x: 100,
          y: 50,
          minimized: false,
          maximized: false,
        }
        addWindow(newWindow)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
      {/* Windows 11 Wallpaper Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${wallpapers.light})` }}
      />
      
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />

      {/* Desktop Content Area */}
      <div className="relative w-full h-full pb-12">
        {/* Desktop Icons and Windows Area */}
        <div className="w-full h-full p-4">
          <DesktopIcons />
          {/* Render all open windows */}
          {windows.map((window) => (
            <AppWindow key={window.id} window={window} />
          ))}
        </div>
      </div>

      {/* Taskbar - includes Start Menu and Search overlays */}
      <Taskbar />
      
      {/* Start Menu */}
      {showStartMenu && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => useStore.getState().setShowStartMenu(false)}
          />
          <StartMenu />
        </>
      )}
    </div>
  )
}
