import { useEffect } from 'react'
import { useStore } from '@/stores'
import Taskbar from '@/components/dock/Taskbar'
import StartMenu from '@/components/StartMenu'
import AppWindow from '@/components/AppWindow'
import DesktopIcons from '@/components/desktop/DesktopIcons'
import { wallpapers } from '@/config/wallpapers'
import { getCenteredPosition } from '@/constants/layout'

export default function Desktop() {
  const { windows, showStartMenu, addWindow } = useStore()

  // Open Notepad whenever user enters desktop
  useEffect(() => {
    const { x, y } = getCenteredPosition(1100, 700)
    addWindow({
      appId: 'notepad',
      title: 'Notepad',
      icon: '/img/icons/notepad.png',
      width: 1100,
      height: 700,
      x: x,
      y: y,
      minWidth: 400,
      minHeight: 300,
    })
  }, [addWindow])

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
      <div className="relative w-full h-full pb-16">
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
