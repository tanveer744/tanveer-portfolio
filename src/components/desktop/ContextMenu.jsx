import { useState, useEffect, useRef } from 'react'
import { IoRefresh, IoDesktop, IoSettings } from 'react-icons/io5'
import { 
  HiOutlineViewGrid, 
  HiSortAscending,
  HiOutlineColorSwatch
} from 'react-icons/hi'
import { Z_INDEX } from '@/constants/zIndex'

/**
 * Windows 11 Style Desktop Context Menu
 * Shows on right-click on empty desktop area
 */
export default function ContextMenu({ x, y, onClose, onAction }) {
  const menuRef = useRef(null)
  const [submenu, setSubmenu] = useState(null)
  const [menuPosition, setMenuPosition] = useState({ x, y })

  // Adjust menu position to stay within viewport
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight - 64 // Account for taskbar
      
      let adjustedX = x
      let adjustedY = y
      
      // Prevent overflow on right
      if (x + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 8
      }
      
      // Prevent overflow on bottom
      if (y + rect.height > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 8
      }
      
      setMenuPosition({ x: adjustedX, y: adjustedY })
    }
  }, [x, y])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleItemClick = (action) => {
    onAction(action)
    onClose()
  }

  const menuItems = [
    {
      id: 'view',
      label: 'View',
      icon: <HiOutlineViewGrid className="w-4 h-4" />,
      submenu: [
        { id: 'large-icons', label: 'Large icons', checked: false },
        { id: 'medium-icons', label: 'Medium icons', checked: true },
        { id: 'small-icons', label: 'Small icons', checked: false },
        { type: 'separator' },
        { id: 'auto-arrange', label: 'Auto arrange icons', checked: true },
        { id: 'align-to-grid', label: 'Align icons to grid', checked: true },
        { type: 'separator' },
        { id: 'show-desktop-icons', label: 'Show desktop icons', checked: true },
      ]
    },
    {
      id: 'sort-by',
      label: 'Sort by',
      icon: <HiSortAscending className="w-4 h-4" />,
      submenu: [
        { id: 'sort-name', label: 'Name', checked: true },
        { id: 'sort-size', label: 'Size', checked: false },
        { id: 'sort-type', label: 'Item type', checked: false },
        { id: 'sort-date', label: 'Date modified', checked: false },
      ]
    },
    { type: 'separator' },
    {
      id: 'refresh',
      label: 'Refresh',
      icon: <IoRefresh className="w-4 h-4" />,
      shortcut: 'F5',
    },
    { type: 'separator' },
    {
      id: 'new',
      label: 'New',
      icon: <span className="w-4 h-4 flex items-center justify-center text-xs">+</span>,
      submenu: [
        { id: 'new-folder', label: 'Folder' },
        { id: 'new-shortcut', label: 'Shortcut' },
        { type: 'separator' },
        { id: 'new-text', label: 'Text Document' },
      ]
    },
    { type: 'separator' },
    {
      id: 'display-settings',
      label: 'Display settings',
      icon: <IoDesktop className="w-4 h-4" />,
    },
    {
      id: 'personalize',
      label: 'Personalize',
      icon: <HiOutlineColorSwatch className="w-4 h-4" />,
    },
  ]

  return (
    <div
      ref={menuRef}
      className={`fixed z-[${Z_INDEX.contextMenu}] min-w-[200px] py-1.5 rounded-lg bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl animate-context-menu`}
      style={{
        left: `${menuPosition.x}px`,
        top: `${menuPosition.y}px`,
        zIndex: Z_INDEX.contextMenu,
      }}
    >
      {menuItems.map((item, index) => {
        if (item.type === 'separator') {
          return (
            <div
              key={`sep-${index}`}
              className="my-1.5 mx-3 h-px bg-white/10"
            />
          )
        }

        const hasSubmenu = item.submenu && item.submenu.length > 0

        return (
          <div
            key={item.id}
            className="relative"
            onMouseEnter={() => hasSubmenu && setSubmenu(item.id)}
            onMouseLeave={() => hasSubmenu && setSubmenu(null)}
          >
            <button
              onClick={() => !hasSubmenu && handleItemClick(item.id)}
              className="w-full flex items-center gap-3 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              <span className="w-5 h-5 flex items-center justify-center text-white/70">
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.shortcut && (
                <span className="text-xs text-white/50">{item.shortcut}</span>
              )}
              {hasSubmenu && (
                <span className="text-white/50 text-xs">▶</span>
              )}
            </button>

            {/* Submenu */}
            {hasSubmenu && submenu === item.id && (
              <div
                className="absolute left-full top-0 ml-0.5 min-w-[180px] py-1.5 rounded-lg bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl"
              >
                {item.submenu.map((subItem, subIndex) => {
                  if (subItem.type === 'separator') {
                    return (
                      <div
                        key={`sub-sep-${subIndex}`}
                        className="my-1.5 mx-3 h-px bg-white/10"
                      />
                    )
                  }

                  return (
                    <button
                      key={subItem.id}
                      onClick={() => handleItemClick(subItem.id)}
                      className="w-full flex items-center gap-3 px-3 py-1.5 text-sm text-white/90 hover:bg-white/10 transition-colors"
                    >
                      <span className="w-4 h-4 flex items-center justify-center">
                        {subItem.checked !== undefined && (
                          subItem.checked ? (
                            <span className="text-blue-400">✓</span>
                          ) : (
                            <span></span>
                          )
                        )}
                      </span>
                      <span className="flex-1 text-left">{subItem.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
