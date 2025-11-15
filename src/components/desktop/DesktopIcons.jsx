import { useStore } from '@/stores'
import { useState, useRef, useEffect } from 'react'

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

// Default positions for icons
const getDefaultPosition = (index) => ({
  x: 16,
  y: 16 + index * 100
})

export default function DesktopIcons() {
  const { iconPositions, setIconPosition } = useStore()

  const handleClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {socialMedia.map((item, index) => (
        <DraggableIcon
          key={item.id}
          item={item}
          position={iconPositions[item.id] || getDefaultPosition(index)}
          onPositionChange={(pos) => setIconPosition(item.id, pos)}
          onClick={() => handleClick(item)}
        />
      ))}
    </div>
  )
}

function DraggableIcon({ item, position, onPositionChange, onClick }) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentPos, setCurrentPos] = useState(position)
  const iconRef = useRef(null)
  const dragThreshold = 5 // pixels moved before considering it a drag
  const totalMovement = useRef(0)

  useEffect(() => {
    setCurrentPos(position)
  }, [position])

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    totalMovement.current = 0
    setDragStart({
      x: e.clientX - currentPos.x,
      y: e.clientY - currentPos.y
    })
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      
      // Calculate total movement
      const dx = newX - currentPos.x
      const dy = newY - currentPos.y
      totalMovement.current += Math.sqrt(dx * dx + dy * dy)

      setCurrentPos({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      
      // If moved less than threshold, treat as click
      if (totalMovement.current < dragThreshold) {
        onClick()
      } else {
        // Save the final position
        onPositionChange(currentPos)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart, currentPos, onClick, onPositionChange])

  return (
    <div
      ref={iconRef}
      onMouseDown={handleMouseDown}
      className="absolute flex flex-col items-center w-20 p-2 rounded hover:bg-white/10 transition-colors duration-200 pointer-events-auto cursor-pointer select-none"
      style={{
        left: `${currentPos.x}px`,
        top: `${currentPos.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      title={item.title}
    >
      <img 
        src={item.icon} 
        alt={item.title} 
        className="w-12 h-12 mb-1 pointer-events-none" 
        draggable="false"
      />
      <span className="text-white text-sm text-center text-shadow pointer-events-none">
        {item.title}
      </span>
    </div>
  )
}
