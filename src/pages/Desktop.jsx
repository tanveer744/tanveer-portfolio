import { useEffect, useState, useCallback } from 'react'
import { useStore } from '@/stores'
import Taskbar from '@/components/dock/Taskbar'
import StartMenu from '@/components/StartMenu'
import AppWindow from '@/components/AppWindow'
import DesktopIcons from '@/components/desktop/DesktopIcons'
import ContextMenu from '@/components/desktop/ContextMenu'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'
import { wallpapersList } from '@/config/wallpapers'
import { getCenteredPosition } from '@/constants/layout'

export default function Desktop() {
  const { 
    windows, 
    showStartMenu, 
    addWindow, 
    clearSelectedIcons,
    setIconSize,
    setIconSort,
    setShowDesktopIcons,
    setAutoArrangeIcons,
    setAlignToGrid,
    darkMode,
    currentWallpaper
  } = useStore()
  const [contextMenu, setContextMenu] = useState(null)
  const [showShortcuts, setShowShortcuts] = useState(false)

  // Get current wallpaper from list
  const selectedWallpaper = wallpapersList.find(w => w.id === currentWallpaper) || wallpapersList[0]

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
      
      // View submenu - Icon sizes
      case 'large-icons':
        setIconSize('large')
        break
      case 'medium-icons':
        setIconSize('medium')
        break
      case 'small-icons':
        setIconSize('small')
        break
      
      // View submenu - Icon settings
      case 'auto-arrange':
        setAutoArrangeIcons(true)
        break
      case 'align-to-grid':
        setAlignToGrid(true)
        break
      case 'show-desktop-icons':
        setShowDesktopIcons((prev) => !prev)
        break
      
      // Sort by submenu
      case 'sort-name':
        setIconSort('name')
        break
      case 'sort-size':
        setIconSort('size')
        break
      case 'sort-type':
        setIconSort('type')
        break
      case 'sort-date':
        setIconSort('date')
        break
      
      // Settings
      case 'personalize':
      case 'display-settings':
        console.log('Settings:', action)
        // TODO: Open settings app
        break
      
      default:
        console.log('Context menu action:', action)
    }
  }, [setIconSize, setIconSort, setShowDesktopIcons, setAutoArrangeIcons, setAlignToGrid])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Show keyboard shortcuts on '?' or 'Shift+/'
      if ((e.key === '?' || (e.key === '/' && e.shiftKey)) && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault()
        setShowShortcuts(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
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
        style={{ backgroundImage: `url(${selectedWallpaper.image})` }}
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

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && <KeyboardShortcuts onClose={() => setShowShortcuts(false)} />}

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
