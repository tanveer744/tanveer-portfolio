import { useState, useEffect } from 'react'
import { getWorkspaceHeight } from '@/constants/layout'

/**
 * Windows 11 Style Snap Assist Grid
 * Shows available snap layouts when dragging a window to screen edge
 */
export default function SnapAssist({ 
  isVisible, 
  position, // 'left', 'right', 'top'
  onSelectLayout,
  onClose 
}) {
  const [hoveredLayout, setHoveredLayout] = useState(null)
  const workspaceHeight = getWorkspaceHeight()

  // Close on escape
  useEffect(() => {
    if (!isVisible) return
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isVisible, onClose])

  if (!isVisible) return null

  // Define snap layouts based on position
  const getLayouts = () => {
    if (position === 'top') {
      return [
        { id: 'maximize', label: 'Full screen', zones: [{ x: 0, y: 0, w: 100, h: 100 }] },
      ]
    }
    
    // Left or right edge - show split layouts
    return [
      { 
        id: 'half', 
        label: 'Half',
        zones: [
          { x: 0, y: 0, w: 50, h: 100, active: position === 'left' },
          { x: 50, y: 0, w: 50, h: 100, active: position === 'right' }
        ]
      },
      { 
        id: 'thirds', 
        label: 'Thirds',
        zones: [
          { x: 0, y: 0, w: 33.33, h: 100 },
          { x: 33.33, y: 0, w: 33.33, h: 100 },
          { x: 66.66, y: 0, w: 33.33, h: 100 }
        ]
      },
      { 
        id: 'quadrants', 
        label: 'Quadrants',
        zones: [
          { x: 0, y: 0, w: 50, h: 50 },
          { x: 50, y: 0, w: 50, h: 50 },
          { x: 0, y: 50, w: 50, h: 50 },
          { x: 50, y: 50, w: 50, h: 50 }
        ]
      },
      { 
        id: 'main-sidebar', 
        label: 'Main + Sidebar',
        zones: [
          { x: 0, y: 0, w: 70, h: 100, active: position === 'left' },
          { x: 70, y: 0, w: 30, h: 100, active: position === 'right' }
        ]
      },
    ]
  }

  const layouts = getLayouts()

  // Position the assist panel
  const getPanelPosition = () => {
    const padding = 16
    
    if (position === 'left') {
      return { left: padding, top: '50%', transform: 'translateY(-50%)' }
    }
    if (position === 'right') {
      return { right: padding, top: '50%', transform: 'translateY(-50%)' }
    }
    return { left: '50%', top: padding, transform: 'translateX(-50%)' }
  }

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {/* Semi-transparent backdrop */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
      
      {/* Snap Assist Panel */}
      <div
        className="absolute pointer-events-auto bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl p-4"
        style={{
          ...getPanelPosition(),
          width: 280
        }}
      >
        <h3 className="text-white/90 text-sm font-medium mb-3">Snap layouts</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => onSelectLayout(layout.id)}
              onMouseEnter={() => setHoveredLayout(layout.id)}
              onMouseLeave={() => setHoveredLayout(null)}
              className={`relative aspect-video rounded-lg border-2 transition-all duration-150 p-1.5 ${
                hoveredLayout === layout.id 
                  ? 'border-blue-400 bg-blue-500/20' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              title={layout.label}
            >
              {/* Layout preview */}
              <div className="relative w-full h-full">
                {layout.zones.map((zone, idx) => (
                  <div
                    key={idx}
                    className={`absolute rounded-sm transition-colors ${
                      zone.active || hoveredLayout === layout.id
                        ? 'bg-blue-400/60'
                        : 'bg-white/20'
                    }`}
                    style={{
                      left: `${zone.x}%`,
                      top: `${zone.y}%`,
                      width: `calc(${zone.w}% - 2px)`,
                      height: `calc(${zone.h}% - 2px)`
                    }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
        
        <p className="text-white/50 text-xs mt-3 text-center">
          Click a layout or press Esc to cancel
        </p>
      </div>
      
      {/* Preview highlight on screen */}
      {hoveredLayout && (
        <LayoutPreview layout={layouts.find(l => l.id === hoveredLayout)} workspaceHeight={workspaceHeight} />
      )}
    </div>
  )
}

function LayoutPreview({ layout, workspaceHeight }) {
  if (!layout) return null
  
  return (
    <>
      {layout.zones.map((zone, idx) => (
        <div
          key={idx}
          className="absolute bg-blue-500/30 border-2 border-blue-400 transition-all duration-200 pointer-events-none"
          style={{
            left: `${zone.x}%`,
            top: `${(zone.y / 100) * workspaceHeight}px`,
            width: `${zone.w}%`,
            height: `${(zone.h / 100) * workspaceHeight}px`
          }}
        />
      ))}
    </>
  )
}
