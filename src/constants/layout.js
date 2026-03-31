/**
 * Layout constants for the Windows desktop environment
 * 
 * IMPORTANT: Taskbar height configuration
 * =======================================
 * The taskbar is 64px tall (Tailwind class: h-16 = 4rem = 64px)
 * 
 * If you need to change the taskbar height:
 * 1. Update TASKBAR_HEIGHT below
 * 2. Update the Taskbar component's className (h-16, h-20, etc.)
 * 3. Update Desktop.jsx padding-bottom (pb-16, pb-20, etc.)
 * 
 * All window positioning logic automatically uses this constant
 * to ensure windows never overlap the taskbar.
 */

// ==================== RESPONSIVE BREAKPOINTS ====================
// Matches Tailwind CSS default breakpoints
export const BREAKPOINTS = {
  sm: 640,   // Small devices (landscape phones)
  md: 768,   // Medium devices (tablets)
  lg: 1024,  // Large devices (desktops)
  xl: 1280,  // Extra large devices (large desktops)
  '2xl': 1536 // 2XL devices (larger desktops)
}

// ==================== DEVICE DETECTION ====================
/**
 * Check if current viewport is mobile-sized
 * @returns {boolean} True if viewport width < 768px
 */
export const isMobile = () => window.innerWidth < BREAKPOINTS.md

/**
 * Check if current viewport is tablet-sized
 * @returns {boolean} True if viewport width is between 768px and 1024px
 */
export const isTablet = () => window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg

/**
 * Check if current viewport is desktop-sized
 * @returns {boolean} True if viewport width >= 1024px
 */
export const isDesktop = () => window.innerWidth >= BREAKPOINTS.lg

/**
 * Get current device type based on viewport width
 * @returns {'mobile' | 'tablet' | 'desktop'} Device type string
 */
export const getDeviceType = () => {
  if (isMobile()) return 'mobile'
  if (isTablet()) return 'tablet'
  return 'desktop'
}

/**
 * Check if device supports touch events
 * @returns {boolean} True if touch is supported
 */
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// ==================== TASKBAR CONFIGURATION ====================
// Taskbar height in pixels (h-16 = 4rem = 64px)
// Change this value if you modify the taskbar's Tailwind height class
export const TASKBAR_HEIGHT = 64

// Mobile taskbar height (slightly smaller for more screen space)
export const TASKBAR_HEIGHT_MOBILE = 56

/**
 * Get taskbar height based on current device
 * @returns {number} Taskbar height in pixels
 */
export const getTaskbarHeight = () => {
  return isMobile() ? TASKBAR_HEIGHT_MOBILE : TASKBAR_HEIGHT
}

/**
 * Get available workspace height (viewport minus taskbar)
 * This is the maximum area where windows can be positioned
 * Now responsive - uses appropriate taskbar height based on device
 */
export const getWorkspaceHeight = () => {
  return window.innerHeight - getTaskbarHeight()
}

/**
 * Get available workspace width (full viewport width)
 */
export const getWorkspaceWidth = () => {
  return window.innerWidth
}

/**
 * Clamp window position to workspace bounds
 * Ensures: 0 <= x <= workspaceWidth - width
 *          0 <= y <= workspaceHeight - height
 * 
 * This prevents windows from:
 * - Going off-screen left/right
 * - Going off-screen top
 * - Overlapping the taskbar at the bottom
 * 
 * @param {number} x - Window x position
 * @param {number} y - Window y position
 * @param {number} width - Window width
 * @param {number} height - Window height
 * @returns {{ x: number, y: number }} - Clamped position
 */
export const clampToWorkspace = (x, y, width, height) => {
  const workspaceHeight = getWorkspaceHeight()
  const workspaceWidth = getWorkspaceWidth()
  
  // Ensure window stays within workspace bounds
  // The bottom edge (y + height) must not exceed workspaceHeight
  const clampedX = Math.max(0, Math.min(x, workspaceWidth - width))
  const clampedY = Math.max(0, Math.min(y, workspaceHeight - height))
  
  return { x: clampedX, y: clampedY }
}

/**
 * Calculate centered position within workspace
 * Useful for opening new windows in the center of the screen
 * 
 * @param {number} width - Window width
 * @param {number} height - Window height
 * @returns {{ x: number, y: number }} - Centered position
 */
export const getCenteredPosition = (width, height) => {
  const workspaceHeight = getWorkspaceHeight()
  const workspaceWidth = getWorkspaceWidth()
  
  return {
    x: Math.max(0, (workspaceWidth - width) / 2),
    y: Math.max(0, (workspaceHeight - height) / 2)
  }
}

/**
 * Validate if a window position would overlap the taskbar
 * Useful for testing and debugging
 * 
 * @param {number} y - Window y position
 * @param {number} height - Window height
 * @returns {boolean} - True if window would overlap taskbar
 */
export const wouldOverlapTaskbar = (y, height) => {
  const workspaceHeight = getWorkspaceHeight()
  return (y + height) > workspaceHeight
}

/**
 * Get debug info about workspace dimensions
 * Useful for troubleshooting window positioning issues
 */
export const getWorkspaceDebugInfo = () => {
  return {
    taskbarHeight: getTaskbarHeight(),
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    workspaceHeight: getWorkspaceHeight(),
    workspaceWidth: getWorkspaceWidth(),
    // Show how much space is available
    availableArea: getWorkspaceWidth() * getWorkspaceHeight(),
    // New responsive info
    deviceType: getDeviceType(),
    isTouchDevice: isTouchDevice(),
    breakpoint: getCurrentBreakpoint()
  }
}

// ==================== RESPONSIVE WINDOW SIZES ====================
/**
 * Get minimum window dimensions based on device type
 * Larger minimums on mobile for better usability
 */
export const getMinWindowDimensions = () => {
  if (isMobile()) {
    return { width: window.innerWidth, height: 300 } // Full width on mobile
  }
  if (isTablet()) {
    return { width: 400, height: 300 }
  }
  return { width: 300, height: 200 } // Desktop defaults
}

/**
 * Get default window dimensions based on device type
 */
export const getDefaultWindowDimensions = (preferredWidth = 800, preferredHeight = 600) => {
  if (isMobile()) {
    // Full screen on mobile
    return {
      width: window.innerWidth,
      height: getWorkspaceHeight()
    }
  }
  if (isTablet()) {
    // 90% of available space on tablet
    return {
      width: Math.min(preferredWidth, window.innerWidth * 0.9),
      height: Math.min(preferredHeight, getWorkspaceHeight() * 0.9)
    }
  }
  // Desktop - use preferred or cap at viewport
  return {
    width: Math.min(preferredWidth, window.innerWidth - 100),
    height: Math.min(preferredHeight, getWorkspaceHeight() - 50)
  }
}

/**
 * Get current Tailwind-style breakpoint name
 * @returns {'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'} Breakpoint name
 */
export const getCurrentBreakpoint = () => {
  const width = window.innerWidth
  if (width < BREAKPOINTS.sm) return 'xs'
  if (width < BREAKPOINTS.md) return 'sm'
  if (width < BREAKPOINTS.lg) return 'md'
  if (width < BREAKPOINTS.xl) return 'lg'
  if (width < BREAKPOINTS['2xl']) return 'xl'
  return '2xl'
}

// ==================== TOUCH TARGET SIZES ====================
/**
 * Minimum touch target size in pixels (44px is Apple's recommendation)
 */
export const MIN_TOUCH_TARGET = 44

/**
 * Get resize handle size based on device type
 * Larger on touch devices for easier interaction
 */
export const getResizeHandleSize = () => {
  return isTouchDevice() ? 16 : 4
}
