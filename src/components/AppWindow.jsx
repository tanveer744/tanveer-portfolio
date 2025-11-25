/**
 * AppWindow - A fully-featured Windows 11 style application window component
 * 
 * Features:
 * - Drag window by titlebar
 * - Resize from all 8 edges and corners (top, bottom, left, right, and all 4 corners)
 * - Minimize, Maximize/Restore, Close controls
 * - Fullscreen mode (F11 toggle)
 * - Window snapping:
 *   - Drag to top edge → maximize
 *   - Drag to left edge → snap left half
 *   - Drag to right edge → snap right half
 * - Double-click titlebar to maximize/restore
 * - Z-index management (click to bring to front)
 * - Viewport clamping (windows stay within bounds)
 * - Smooth animations and transitions
 * - Windows 11-inspired design
 * 
 * Props:
 * @param {Object} window - Window object from store containing:
 *   - id: unique window identifier
 *   - appId: application identifier
 *   - title: window title
 *   - icon: window icon (emoji or image URL)
 *   - x, y: position
 *   - width, height: dimensions
 *   - minWidth, minHeight: minimum dimensions
 *   - isMinimized, isMaximized, isFullscreen: window states
 *   - zIndex: stacking order
 * 
 * Usage:
 * ```jsx
 * import { useStore } from '@/stores'
 * 
 * function Desktop() {
 *   const { windows } = useStore()
 *   return (
 *     <div>
 *       {windows.map(window => (
 *         <AppWindow key={windowData.id} window={window} />
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 * 
 * Adding a new window:
 * ```jsx
 * const { addWindow } = useStore()
 * 
 * addWindow({
 *   appId: 'notepad',
 *   title: 'Notepad',
 *   icon: '📝',
 *   x: 100,
 *   y: 100,
 *   width: 800,
 *   height: 600,
 *   minWidth: 400,
 *   minHeight: 300
 * })
 * ```
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import { useStore } from '@/stores'
import { TASKBAR_HEIGHT, getWorkspaceHeight, clampToWorkspace } from '@/constants/layout'

export default function AppWindow({ window: windowData }) {
  // Don't render minimized windows - must be before any hooks
  if (windowData.isMinimized) {
    return null
  }

  const { 
    setActiveWindow, 
    removeWindow, 
    minimizeWindow, 
    toggleMaximizeWindow,
    toggleFullscreenWindow,
    updateWindowPosition,
    updateWindowSize,
    snapWindowLeft,
    snapWindowRight,
    activeWindow 
  } = useStore()
  
  const isActive = activeWindow === windowData.id
  const windowRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, windowX: 0, windowY: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, windowX: 0, windowY: 0 })
  const [snapZone, setSnapZone] = useState(null)
  const lastClickTimeRef = useRef(0)

  const handleClose = () => {
    removeWindow(windowData.id)
  }

  const handleMinimize = () => {
    minimizeWindow(windowData.id)
  }

  const handleMaximize = () => {
    toggleMaximizeWindow(windowData.id)
  }

  const handleTitleBarDoubleClick = () => {
    const now = Date.now()
    if (now - lastClickTimeRef.current < 300) {
      toggleMaximizeWindow(windowData.id)
    }
    lastClickTimeRef.current = now
  }

  // Handle fullscreen toggle (F11)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F11' && isActive) {
        e.preventDefault()
        toggleFullscreenWindow(windowData.id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, windowData.id, toggleFullscreenWindow])

  // Self-correction: Auto-fix window position on mount and viewport resize
  // This catches any windows that somehow ended up overlapping the taskbar
  useEffect(() => {
    if (windowData.isMaximized || windowData.isFullscreen) return

    const correctPosition = () => {
      const workspaceHeight = getWorkspaceHeight()
      const maxY = workspaceHeight - windowData.height
      
      // Check if window is overlapping taskbar
      if (windowData.y > maxY || windowData.y < 0) {
        const correctedY = Math.max(0, Math.min(windowData.y, maxY))
        console.log(`[Self-Correction] Window ${windowData.id} overlapping taskbar:`, {
          currentY: windowData.y,
          correctedY,
          workspaceHeight,
          windowHeight: windowData.height
        })
        updateWindowPosition(windowData.id, windowData.x, correctedY)
      }
    }

    // Check on mount
    correctPosition()
    
    // Check on window resize
    const handleResize = () => {
      correctPosition()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [windowData.id, windowData.x, windowData.y, windowData.width, windowData.height, windowData.isMaximized, windowData.isFullscreen, updateWindowPosition])

  // Note: clampPosition is no longer needed as the store enforces boundaries
  // Kept for backwards compatibility if needed
  const clampPosition = useCallback((x, y, width, height) => {
    return clampToWorkspace(x, y, width, height)
  }, [])

  // Detect snap zones while dragging
  const detectSnapZone = useCallback((x, y) => {
    const threshold = 10
    if (y < threshold) return 'top'
    if (x < threshold) return 'left'
    if (x > window.innerWidth - threshold) return 'right'
    return null
  }, [])

  // Start dragging
  const handleDragStart = useCallback((e) => {
    if (windowData.isMaximized || windowData.isFullscreen) return
    if (e.target.closest('.window-controls')) return
    
    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      windowX: windowData.x,
      windowY: windowData.y
    })
    e.preventDefault()
  }, [windowData.isMaximized, windowData.isFullscreen, windowData.x, windowData.y])

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y
      
      let newX = dragStart.windowX + deltaX
      let newY = dragStart.windowY + deltaY

      // Debug logging for drag (throttled to avoid spam)
      if (process.env.NODE_ENV === 'development' && Math.random() < 0.05) {
        console.log('[Window Drag]', {
          position: { x: newX, y: newY },
          size: { width: windowData.width, height: windowData.height },
          workspaceHeight: getWorkspaceHeight(),
          taskbarHeight: TASKBAR_HEIGHT
        })
      }

      // Update position (store will clamp to workspace)
      updateWindowPosition(windowData.id, newX, newY)

      // Detect snap zone
      const zone = detectSnapZone(e.clientX, e.clientY)
      setSnapZone(zone)
    }

    const handleMouseUp = (e) => {
      setIsDragging(false)
      
      // Apply snap if in snap zone
      const zone = detectSnapZone(e.clientX, e.clientY)
      if (zone === 'top') {
        toggleMaximizeWindow(windowData.id)
      } else if (zone === 'left') {
        snapWindowLeft(windowData.id)
      } else if (zone === 'right') {
        snapWindowRight(windowData.id)
      }
      setSnapZone(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart, windowData.id, windowData.width, windowData.height, clampPosition, detectSnapZone, updateWindowPosition, toggleMaximizeWindow, snapWindowLeft, snapWindowRight])

  // Start resizing
  const handleResizeStart = useCallback((direction, e) => {
    if (windowData.isMaximized || windowData.isFullscreen) return
    
    setIsResizing(true)
    setResizeDirection(direction)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: windowData.width,
      height: windowData.height,
      windowX: windowData.x,
      windowY: windowData.y
    })
    e.preventDefault()
    e.stopPropagation()
  }, [windowData.isMaximized, windowData.isFullscreen, windowData.width, windowData.height, windowData.x, windowData.y])

  // Handle resizing
  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y

      let newWidth = resizeStart.width
      let newHeight = resizeStart.height
      let newX = resizeStart.windowX
      let newY = resizeStart.windowY

      // Calculate new dimensions based on resize direction
      if (resizeDirection.includes('right')) {
        newWidth = Math.max(windowData.minWidth, resizeStart.width + deltaX)
      }
      if (resizeDirection.includes('left')) {
        const potentialWidth = resizeStart.width - deltaX
        if (potentialWidth >= windowData.minWidth) {
          newWidth = potentialWidth
          newX = resizeStart.windowX + deltaX
        }
      }
      if (resizeDirection.includes('bottom')) {
        newHeight = Math.max(windowData.minHeight, resizeStart.height + deltaY)
      }
      if (resizeDirection.includes('top')) {
        const potentialHeight = resizeStart.height - deltaY
        if (potentialHeight >= windowData.minHeight) {
          newHeight = potentialHeight
          newY = resizeStart.windowY + deltaY
        }
      }

      // Clamp to workspace (respecting taskbar)
      const workspaceHeight = getWorkspaceHeight()
      const workspaceWidth = window.innerWidth
      
      // Clamp width to not exceed screen
      if (newX + newWidth > workspaceWidth) {
        newWidth = workspaceWidth - newX
      }
      
      // Clamp height to not overlap taskbar
      if (newY + newHeight > workspaceHeight) {
        newHeight = workspaceHeight - newY
      }
      
      // Ensure minimum dimensions
      newWidth = Math.max(windowData.minWidth, newWidth)
      newHeight = Math.max(windowData.minHeight, newHeight)

      // Debug logging for resize
      if (process.env.NODE_ENV === 'development') {
        console.log('[Window Resize]', {
          direction: resizeDirection,
          position: { x: newX, y: newY },
          size: { width: newWidth, height: newHeight },
          workspace: { workspaceWidth, workspaceHeight, taskbarHeight: TASKBAR_HEIGHT }
        })
      }

      // Update size first (which will also clamp position in store)
      updateWindowSize(windowData.id, newWidth, newHeight)
      
      // Update position if it changed (top/left resize)
      if (newX !== windowData.x || newY !== windowData.y) {
        updateWindowPosition(windowData.id, newX, newY)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection(null)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, resizeDirection, resizeStart, windowData.id, windowData.minWidth, windowData.minHeight, windowData.x, windowData.y, updateWindowSize, updateWindowPosition])

  // Calculate window styles
  // Store guarantees all positions are valid - no need to re-clamp here
  const getWindowStyle = () => {
    if (windowData.isFullscreen) {
      return {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        zIndex: windowData.zIndex,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
    
    if (windowData.isMaximized) {
      // Maximize to workspace height (not full viewport)
      const workspaceHeight = getWorkspaceHeight()
      return {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: `${workspaceHeight}px`,
        zIndex: windowData.zIndex,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
    
    // Normal windows - use stored position (already clamped by store)
    return {
      position: 'fixed',
      left: windowData.x,
      top: windowData.y,
      width: windowData.width,
      height: windowData.height,
      zIndex: windowData.zIndex,
      transition: isDragging || isResizing ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }

  const ResizeHandle = ({ direction, className, cursor }) => (
    <div
      className={`absolute ${className} resize-handle`}
      style={{ cursor }}
      onMouseDown={(e) => handleResizeStart(direction, e)}
    />
  )

  return (
    <div
      ref={windowRef}
      style={getWindowStyle()}
      onMouseDown={() => setActiveWindow(windowData.id)}
      className="window-container"
    >
      <div className={`w-full h-full flex flex-col rounded-win overflow-hidden shadow-win ${
        isActive ? 'ring-2 ring-win-accent/50' : 'ring-1 ring-gray-300/50 dark:ring-gray-700/50'
      }`}>
        
        {/* Snap preview overlay */}
        {snapZone && (
          <div className="fixed inset-0 pointer-events-none z-[9999]">
            <div 
              className="absolute bg-win-accent/20 border-2 border-win-accent transition-all duration-150"
              style={{
                left: snapZone === 'left' ? 0 : snapZone === 'right' ? '50%' : 0,
                top: 0,
                width: snapZone === 'top' ? '100%' : '50%',
                height: `${getWorkspaceHeight()}px`
              }}
            />
          </div>
        )}

        {/* Title Bar */}
        <div 
          className="h-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 select-none cursor-move"
          onMouseDown={handleDragStart}
          onClick={handleTitleBarDoubleClick}
        >
          {/* Left - App Icon & Title */}
          <div className="flex items-center gap-2 flex-1 min-w-0 pointer-events-none">
            {windowData.icon ? (
              typeof windowData.icon === 'string' ? (
                windowData.icon.startsWith('http') || windowData.icon.startsWith('/') ? (
                  <img 
                    src={windowData.icon} 
                    alt={windowData.title} 
                    className="w-4 h-4 flex-shrink-0 object-contain"
                    onError={(e) => {
                      // Fallback to a default icon if the image fails to load
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'inline'
                    }}
                  />
                ) : (
                  <span className="text-sm w-4 h-4 flex items-center justify-center">{windowData.icon}</span>
                )
              ) : (
                <span className="text-sm w-4 h-4 flex items-center justify-center">{windowData.icon}</span>
              )
            ) : (
              <div className="w-4 h-4 bg-gray-300 rounded-sm flex-shrink-0"></div>
            )}
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate ml-1">
              {windowData.title}
            </span>
          </div>

          {/* Right - Window Controls */}
          <div className="flex items-center gap-0 flex-shrink-0 window-controls">
            {/* Minimize */}
            <button
              onClick={handleMinimize}
              className="w-11 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 transition-colors flex items-center justify-center group"
              title="Minimize"
            >
              <svg className="w-3 h-3" viewBox="0 0 12 12">
                <rect x="0" y="5" width="12" height="2" className="fill-gray-700 dark:fill-gray-300" />
              </svg>
            </button>

            {/* Maximize/Restore */}
            <button
              onClick={handleMaximize}
              className="w-11 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 transition-colors flex items-center justify-center group"
              title={windowData.isMaximized ? "Restore Down" : "Maximize"}
            >
              {windowData.isMaximized ? (
                <svg className="w-3 h-3" viewBox="0 0 12 12">
                  <rect x="2" y="2" width="8" height="8" className="fill-none stroke-gray-700 dark:stroke-gray-300 stroke-[1.5]" />
                  <path d="M 2,2 L 2,0 L 12,0 L 12,10 L 10,10" className="fill-none stroke-gray-700 dark:stroke-gray-300 stroke-[1.5]" />
                </svg>
              ) : (
                <svg className="w-3 h-3" viewBox="0 0 12 12">
                  <rect x="0" y="0" width="12" height="12" className="fill-none stroke-gray-700 dark:stroke-gray-300 stroke-[1.5]" />
                </svg>
              )}
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="w-11 h-8 hover:bg-red-500 active:bg-red-600 transition-colors flex items-center justify-center group"
              title="Close"
            >
              <svg className="w-3 h-3" viewBox="0 0 12 12">
                <path
                  d="M 0,0 L 12,12 M 12,0 L 0,12"
                  className="stroke-gray-700 dark:stroke-gray-300 group-hover:stroke-white stroke-[1.5]"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="window-content flex-1 bg-white dark:bg-gray-900 overflow-auto">
          <AppContent appId={windowData.appId} windowData={windowData} />
        </div>

        {/* Resize Handles - only show when not maximized/fullscreen */}
        {!windowData.isMaximized && !windowData.isFullscreen && (
          <>
            {/* Edges */}
            <ResizeHandle direction="top" className="top-0 left-0 right-0 h-1 -mt-0.5" cursor="ns-resize" />
            <ResizeHandle direction="bottom" className="bottom-0 left-0 right-0 h-1 -mb-0.5" cursor="ns-resize" />
            <ResizeHandle direction="left" className="left-0 top-0 bottom-0 w-1 -ml-0.5" cursor="ew-resize" />
            <ResizeHandle direction="right" className="right-0 top-0 bottom-0 w-1 -mr-0.5" cursor="ew-resize" />
            
            {/* Corners */}
            <ResizeHandle direction="top-left" className="top-0 left-0 w-2 h-2 -mt-1 -ml-1" cursor="nwse-resize" />
            <ResizeHandle direction="top-right" className="top-0 right-0 w-2 h-2 -mt-1 -mr-1" cursor="nesw-resize" />
            <ResizeHandle direction="bottom-left" className="bottom-0 left-0 w-2 h-2 -mb-1 -ml-1" cursor="nesw-resize" />
            <ResizeHandle direction="bottom-right" className="bottom-0 right-0 w-2 h-2 -mb-1 -mr-1" cursor="nwse-resize" />
          </>
        )}
      </div>
    </div>
  )
}

import Notepad from './apps/Notepad'
import Terminal from './apps/Terminal'
import Camera from './apps/Camera'

// Placeholder content for different apps
function AppContent({ appId, windowData }) {
  const contentMap = {
    notepad: <Notepad windowData={windowData} />,
    edge: <BrowserContent />,
    vscode: <VSCodeContent />,
    terminal: <Terminal />,
    camera: <Camera />,
    explorer: <ExplorerContent />,
    settings: <SettingsContent />,
  }

  return contentMap[appId] || <DefaultContent appId={appId} />
}

function BrowserContent() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 gap-2">
        <button className="text-gray-500">←</button>
        <button className="text-gray-500">→</button>
        <button className="text-gray-500">↻</button>
        <input
          type="text"
          defaultValue="https://github.com"
          className="flex-1 px-3 py-1 text-sm rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
        />
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">🌐</div>
          <div>Browser Content</div>
        </div>
      </div>
    </div>
  )
}

function VSCodeContent() {
  return (
    <div className="w-full h-full bg-[#1e1e1e] text-gray-300 p-4 font-mono text-sm">
      <div className="text-green-400">{'//'} Visual Studio Code</div>
      <div className="mt-2">
        <span className="text-purple-400">function</span>
        <span className="text-yellow-300"> hello</span>
        <span>() {'{'}</span>
      </div>
      <div className="ml-4">
        <span className="text-blue-400">console</span>
        <span>.log(</span>
        <span className="text-orange-400">&quot;Hello, Windows 11!&quot;</span>
        <span>);</span>
      </div>
      <div>{'}'}</div>
    </div>
  )
}

function ExplorerContent() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 gap-2">
        <button className="text-gray-500">←</button>
        <button className="text-gray-500">→</button>
        <button className="text-gray-500">↑</button>
        <div className="flex-1 px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded">
          This PC &gt; Documents
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {['📁 Projects', '📁 Documents', '📁 Pictures', '📄 README.md'].map((item) => (
            <div key={item} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="w-full h-full flex">
      <div className="w-48 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-4">
        <div className="space-y-2">
          {['System', 'Personalization', 'Apps', 'Accounts', 'Network'].map((item) => (
            <div key={item} className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer text-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Configure your Windows experience</p>
      </div>
    </div>
  )
}

function DefaultContent({ appId }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-gray-500">
      <div className="text-center">
        <div className="text-4xl mb-2">📱</div>
        <div>App: {appId}</div>
      </div>
    </div>
  )
}
