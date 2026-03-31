/**
 * Z-Index Hierarchy Constants
 * ============================
 * 
 * Centralized z-index values to prevent conflicts between UI layers.
 * All components should import and use these constants instead of
 * hardcoding z-index values.
 * 
 * HIERARCHY (lowest to highest):
 * 1. Desktop background & icons
 * 2. Windows (dynamic, starts at 1000)
 * 3. Context menus (above windows)
 * 4. Start menu & search
 * 5. Taskbar & system UI
 * 6. Overlays & modals
 * 7. Tooltips & notifications
 * 8. Critical system dialogs
 */

export const Z_INDEX = {
  // Base layer - desktop background
  desktop: 0,
  
  // Desktop icons layer
  desktopIcons: 10,
  
  // Windows base z-index (dynamic: 1000, 1001, 1002, ...)
  // Each new window gets the next available z-index
  windowsBase: 1000,
  
  // Context menus - must be above all windows
  contextMenu: 10000,
  
  // Start menu - above context menus
  startMenu: 10100,
  
  // Windows search overlay
  search: 10200,
  
  // Taskbar - always visible
  taskbar: 10300,
  
  // Quick settings panel
  quickSettings: 10400,
  
  // Window snap preview overlay
  snapPreview: 10500,
  
  // Tooltips
  tooltips: 10600,
  
  // Modal dialogs (alerts, confirmations)
  modals: 10700,
  
  // Notifications/toasts
  notifications: 10800,
  
  // Critical system dialogs (errors, BSOD)
  critical: 10900
}

/**
 * Get the Tailwind z-index class for a given layer
 * @param {keyof Z_INDEX} layer - The layer name
 * @returns {string} - Tailwind class like "z-[1000]"
 */
export const getZIndexClass = (layer) => {
  const value = Z_INDEX[layer]
  if (value === undefined) {
    console.warn(`Unknown z-index layer: ${layer}`)
    return 'z-auto'
  }
  return `z-[${value}]`
}

/**
 * Check if a z-index would appear above a given layer
 * @param {number} zIndex - The z-index to check
 * @param {keyof Z_INDEX} layer - The layer to compare against
 * @returns {boolean} - True if zIndex is above the layer
 */
export const isAboveLayer = (zIndex, layer) => {
  return zIndex > Z_INDEX[layer]
}

/**
 * Get debug info about z-index hierarchy
 * Useful for troubleshooting layering issues
 */
export const getZIndexDebugInfo = () => {
  const layers = Object.entries(Z_INDEX)
    .sort((a, b) => a[1] - b[1])
    .map(([name, value]) => ({ name, value }))
  
  return {
    layers,
    windowsRange: `${Z_INDEX.windowsBase} - ${Z_INDEX.contextMenu - 1}`,
    maxWindowsSupported: Z_INDEX.contextMenu - Z_INDEX.windowsBase
  }
}
