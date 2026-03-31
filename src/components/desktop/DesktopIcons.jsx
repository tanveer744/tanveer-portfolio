import { useStore } from '@/stores'
import { useState, useRef, useEffect, useCallback } from 'react'
import { getCenteredPosition } from '@/utils'

// Grid configuration for icon snapping
const GRID_SIZE = 90 // pixels
const GRID_PADDING = 16 // padding from edges

// Desktop apps
const desktopApps = [
  {
    id: 'notepad',
    title: 'Notepad',
    icon: '/img/icons/notepad.png',
    appId: 'notepad',
    width: 1100,
    height: 700,
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: '/img/icons/terminal.png',
    appId: 'terminal',
    width: 800,
    height: 600,
  },
  {
    id: 'camera',
    title: 'Camera',
    icon: '/img/icons/camera.png',
    appId: 'camera',
    width: 1200,
    height: 800,
  },
]

// Social media links
const socialMedia = [
  {
    id: 'github',
    title: 'GitHub',
    icon: '/img/icons/github.png',
    url: 'https://github.com/tanveer744'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: '/img/icons/linkedin.png',
    url: 'https://www.linkedin.com/in/shaik-tanveer-lohare/'
  },
  {
    id: 'instagram',
    title: 'Instagram',
    icon: '/img/icons/instagram.png',
    url: 'https://www.instagram.com/shaiktanveer_74?igsh=NzZ4NWl1NHI4NXZ2'
  }
]

const allIcons = [...desktopApps, ...socialMedia]

// Snap position to grid
const snapToGrid = (position) => ({
  x: Math.round((position.x - GRID_PADDING) / GRID_SIZE) * GRID_SIZE + GRID_PADDING,
  y: Math.round((position.y - GRID_PADDING) / GRID_SIZE) * GRID_SIZE + GRID_PADDING
})

// Default positions for icons (grid-aligned)
const getDefaultPosition = (index) => ({
  x: GRID_PADDING,
  y: GRID_PADDING + index * GRID_SIZE
})

export default function DesktopIcons() {
  const { 
    iconPositions, 
    setIconPosition, 
    addWindow, 
    windows,
    selectedIcons,
    setSelectedIcons,
    clearSelectedIcons
  } = useStore()

  // Open an app or link
  const openItem = useCallback((item) => {
    // Handle external links
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
      return
    }

    // Handle app launch
    if (item.appId) {
      // Check if app is already open
      const existingWindow = windows.find(w => w.appId === item.appId && !w.isMinimized)
      
      if (existingWindow) {
        // Focus existing window
        useStore.getState().setActiveWindow(existingWindow.id)
      } else {
        // Open new window with centered position
        const { x, y } = getCenteredPosition(item.width || 800, item.height || 600)
        addWindow({
          appId: item.appId,
          title: item.title,
          icon: item.icon,
          x: x + windows.length * 30, // Cascade windows
          y: y + windows.length * 30,
          width: item.width || 800,
          height: item.height || 600,
          minWidth: 400,
          minHeight: 300,
        })
      }
    }
  }, [addWindow, windows])

  // Handle icon selection
  const handleSelect = useCallback((itemId, isCtrlKey) => {
    if (isCtrlKey) {
      // Ctrl+click: Toggle selection
      const currentSelected = selectedIcons || []
      if (currentSelected.includes(itemId)) {
        setSelectedIcons(currentSelected.filter(id => id !== itemId))
      } else {
        setSelectedIcons([...currentSelected, itemId])
      }
    } else {
      // Normal click: Select only this icon
      setSelectedIcons([itemId])
    }
  }, [selectedIcons, setSelectedIcons])

  // Handle double-click to open
  const handleOpen = useCallback((item) => {
    openItem(item)
  }, [openItem])

  // Check if position is occupied by another icon
  const isPositionOccupied = useCallback((pos, excludeId) => {
    return allIcons.some(icon => {
      if (icon.id === excludeId) return false
      const iconPos = iconPositions[icon.id] || getDefaultPosition(allIcons.indexOf(icon))
      return iconPos.x === pos.x && iconPos.y === pos.y
    })
  }, [iconPositions])

  // Find next available grid position
  const findAvailablePosition = useCallback((preferredPos, excludeId) => {
    let pos = snapToGrid(preferredPos)
    
    // If preferred position is free, use it
    if (!isPositionOccupied(pos, excludeId)) {
      return pos
    }
    
    // Otherwise, find the nearest free spot
    const maxCols = Math.floor((window.innerWidth - GRID_PADDING * 2) / GRID_SIZE)
    const maxRows = Math.floor((window.innerHeight - 64 - GRID_PADDING * 2) / GRID_SIZE)
    
    for (let distance = 1; distance < Math.max(maxCols, maxRows); distance++) {
      for (let dx = -distance; dx <= distance; dx++) {
        for (let dy = -distance; dy <= distance; dy++) {
          if (Math.abs(dx) === distance || Math.abs(dy) === distance) {
            const testPos = {
              x: pos.x + dx * GRID_SIZE,
              y: pos.y + dy * GRID_SIZE
            }
            // Check bounds
            if (testPos.x >= GRID_PADDING && testPos.y >= GRID_PADDING &&
                testPos.x < window.innerWidth - GRID_SIZE &&
                testPos.y < window.innerHeight - 64 - GRID_SIZE) {
              if (!isPositionOccupied(testPos, excludeId)) {
                return testPos
              }
            }
          }
        }
      }
    }
    
    return pos // Fallback to original position
  }, [isPositionOccupied])

  // Handle position change with grid snapping
  const handlePositionChange = useCallback((itemId, newPos) => {
    const snappedPos = snapToGrid(newPos)
    const finalPos = findAvailablePosition(snappedPos, itemId)
    setIconPosition(itemId, finalPos)
  }, [findAvailablePosition, setIconPosition])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {allIcons.map((item, index) => (
        <DraggableIcon
          key={item.id}
          item={item}
          position={iconPositions[item.id] || getDefaultPosition(index)}
          onPositionChange={(pos) => handlePositionChange(item.id, pos)}
          onSelect={(ctrlKey) => handleSelect(item.id, ctrlKey)}
          onOpen={() => handleOpen(item)}
          isSelected={(selectedIcons || []).includes(item.id)}
        />
      ))}
    </div>
  )
}

function DraggableIcon({ item, position, onPositionChange, onSelect, onOpen, isSelected }) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentPos, setCurrentPos] = useState(position)
  const iconRef = useRef(null)
  const dragThreshold = 5 // pixels moved before considering it a drag
  const totalMovement = useRef(0)
  const lastClickTime = useRef(0)
  const clickCount = useRef(0)

  useEffect(() => {
    setCurrentPos(position)
  }, [position])

  // Unified handler for mouse and touch start
  const handleDragStartEvent = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Get coordinates from mouse or touch event
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    
    setIsDragging(true)
    totalMovement.current = 0
    setDragStart({
      x: clientX - currentPos.x,
      y: clientY - currentPos.y
    })
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMove = (e) => {
      // Get coordinates from mouse or touch event
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      
      const newX = clientX - dragStart.x
      const newY = clientY - dragStart.y
      
      // Calculate total movement
      const dx = newX - currentPos.x
      const dy = newY - currentPos.y
      totalMovement.current += Math.sqrt(dx * dx + dy * dy)

      setCurrentPos({ x: newX, y: newY })
    }

    const handleEnd = (e) => {
      setIsDragging(false)
      
      // If moved less than threshold, handle as click
      if (totalMovement.current < dragThreshold) {
        const now = Date.now()
        const timeSinceLastClick = now - lastClickTime.current
        
        // Get ctrl/meta key state - for touch, never true
        const isCtrlKey = e.ctrlKey || e.metaKey || false
        
        if (timeSinceLastClick < 300) {
          // Double-click/double-tap: Open the item
          clickCount.current = 0
          onOpen()
        } else {
          // Single-click/tap: Select the item
          clickCount.current = 1
          onSelect(isCtrlKey)
        }
        
        lastClickTime.current = now
      } else {
        // Dragged: Save the final position with grid snapping
        onPositionChange(currentPos)
      }
    }

    // Mouse events
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    // Touch events
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
    window.addEventListener('touchcancel', handleEnd)
    
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
      window.removeEventListener('touchcancel', handleEnd)
    }
  }, [isDragging, dragStart, currentPos, onOpen, onSelect, onPositionChange])

  return (
    <div
      ref={iconRef}
      onMouseDown={handleDragStartEvent}
      onTouchStart={handleDragStartEvent}
      className={`absolute flex flex-col items-center w-20 p-2 rounded transition-colors duration-150 pointer-events-auto select-none touch-none
        ${isSelected 
          ? 'bg-blue-500/30 ring-1 ring-blue-400/50' 
          : 'hover:bg-white/10'
        }
        ${isDragging ? 'opacity-70 scale-105' : ''}
      `}
      style={{
        left: `${currentPos.x}px`,
        top: `${currentPos.y}px`,
        cursor: isDragging ? 'grabbing' : 'pointer',
        zIndex: isDragging ? 100 : 1
      }}
      title={item.title}
    >
      <img 
        src={item.icon} 
        alt={item.title} 
        className="w-12 h-12 mb-1 pointer-events-none drop-shadow-lg" 
        draggable="false"
      />
      <span 
        className="text-white text-xs text-center pointer-events-none leading-tight"
        style={{
          textShadow: '1px 1px 2px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)'
        }}
      >
        {item.title}
      </span>
    </div>
  )
}
