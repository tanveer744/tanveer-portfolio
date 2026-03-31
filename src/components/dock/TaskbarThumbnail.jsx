import { useState, useEffect, useRef } from 'react'
import { useStore } from '@/stores'
import { IoClose } from 'react-icons/io5'
import { Z_INDEX } from '@/constants/zIndex'

/**
 * Windows 11 Style Taskbar Thumbnail Preview
 * Shows when hovering over running app icons in taskbar
 */
export default function TaskbarThumbnail({ app, windows, onClose }) {
  const { setActiveWindow, restoreWindow, minimizeWindow, activeWindow } = useStore()
  const [isVisible, setIsVisible] = useState(false)
  const thumbnailRef = useRef(null)

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleWindowClick = (windowData) => {
    if (windowData.isMinimized) {
      restoreWindow(windowData.id)
    } else {
      setActiveWindow(windowData.id)
    }
    onClose()
  }

  const handleCloseWindow = (e, windowId) => {
    e.stopPropagation()
    useStore.getState().closeWindow(windowId)
  }

  if (windows.length === 0) return null

  return (
    <div
      ref={thumbnailRef}
      className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 transition-all duration-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      style={{ zIndex: Z_INDEX.tooltips }}
    >
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-lg border border-white/10 shadow-2xl overflow-hidden">
        {/* App title header */}
        <div className="px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src={app.icon} alt={app.title} className="w-4 h-4" />
            <span className="text-white/90 text-sm font-medium">{app.title}</span>
          </div>
        </div>

        {/* Window previews */}
        <div className="p-2 flex gap-2">
          {windows.map((windowData) => (
            <div
              key={windowData.id}
              onClick={() => handleWindowClick(windowData)}
              className={`relative group cursor-pointer rounded-md overflow-hidden transition-all hover:ring-2 hover:ring-blue-400/50 ${
                activeWindow === windowData.id ? 'ring-2 ring-blue-400/50' : ''
              }`}
            >
              {/* Thumbnail preview */}
              <div className="w-48 h-32 bg-gray-800 flex items-center justify-center">
                {/* Simplified preview - shows app icon */}
                <div className="flex flex-col items-center gap-2 text-white/50">
                  <img src={windowData.icon} alt={windowData.title} className="w-12 h-12 opacity-50" />
                  <span className="text-xs">{windowData.isMinimized ? '(Minimized)' : ''}</span>
                </div>
              </div>

              {/* Window title bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
                <span className="text-white/90 text-xs truncate block">{windowData.title}</span>
              </div>

              {/* Close button */}
              <button
                onClick={(e) => handleCloseWindow(e, windowData.id)}
                className="absolute top-1 right-1 w-6 h-6 rounded bg-black/50 opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all flex items-center justify-center"
              >
                <IoClose className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow pointer */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 bg-gray-900/95 border-r border-b border-white/10" />
    </div>
  )
}
