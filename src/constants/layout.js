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

// Taskbar height in pixels (h-16 = 4rem = 64px)
// Change this value if you modify the taskbar's Tailwind height class
export const TASKBAR_HEIGHT = 64

/**
 * Get available workspace height (viewport minus taskbar)
 * This is the maximum area where windows can be positioned
 */
export const getWorkspaceHeight = () => {
  return window.innerHeight - TASKBAR_HEIGHT
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
    taskbarHeight: TASKBAR_HEIGHT,
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    workspaceHeight: getWorkspaceHeight(),
    workspaceWidth: getWorkspaceWidth(),
    // Show how much space is available
    availableArea: getWorkspaceWidth() * getWorkspaceHeight()
  }
}
