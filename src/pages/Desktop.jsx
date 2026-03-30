import { useEffect, useState, useCallback } from 'react'
import { useStore } from '@/stores'
import Taskbar from '@/components/dock/Taskbar'
import StartMenu from '@/components/StartMenu'
import AppWindow from '@/components/AppWindow'
import DesktopIcons from '@/components/desktop/DesktopIcons'
import ContextMenu from '@/components/desktop/ContextMenu'
import { wallpapers } from '@/config/wallpapers'
import { getCenteredPosition } from '@/constants/layout'

export default function Desktop() {
  const { windows, showStartMenu, addWindow, clearSelectedIcons } = useStore()
  const [contextMenu, setContextMenu] = useState(null)

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

  // Handle right-click on desktop
  const handleContextMenu = useCallback((e) => {
    // Only show context menu if clicking on the desktop background
    if (e.target.closest('.desktop-content-area') && !e.target.closest('.pointer-events-auto')) {
      e.preventDefault()
      setContextMenu({ x: e.clientX, y: e.clientY })
    }
  }, [])

  // Handle click on desktop (deselect icons)
  const handleDesktopClick = useCallback((e) => {
    // Only deselect if clicking on empty desktop area
    if (e.target.closest('.desktop-content-area') && !e.target.closest('.pointer-events-auto')) {
      clearSelectedIcons()
    }
    // Close context menu on any click
    setContextMenu(null)
  }, [clearSelectedIcons])

  // Handle context menu actions
  const handleContextMenuAction = useCallback((action) => {
    switch (action) {
      case 'refresh':
        window.location.reload()
        break
      case 'large-icons':
      case 'medium-icons':
      case 'small-icons':
        // TODO: Implement icon size changes
        console.log('Icon size:', action)
        break
      case 'sort-name':
      case 'sort-size':
      case 'sort-type':
      case 'sort-date':
        // TODO: Implement sorting
        console.log('Sort by:', action)
        break
      case 'personalize':
      case 'display-settings':
        // TODO: Open settings
        console.log('Settings:', action)
        break
      default:
        console.log('Context menu action:', action)
    }
  }, [])

  return (
    <div 
      className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      {/* Windows 11 Wallpaper Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${wallpapers.light})` }}
      />
      
      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />

      {/* Desktop Content Area */}
      <div className="relative w-full h-full pb-16 desktop-content-area">
        {/* Desktop Icons and Windows Area */}
        <div className="w-full h-full p-4">
          <DesktopIcons />
          {/* Render all open windows */}
          {windows.map((window) => (
            <AppWindow key={window.id} window={window} />
          ))}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={handleContextMenuAction}
        />
      )}

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
