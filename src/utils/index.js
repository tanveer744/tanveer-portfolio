// Utility functions

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

// Window management utilities

/**
 * Clamp a value between min and max
 */
export const clamp = (value, min, max) => {
  return Math.max(min, Math.min(value, max))
}

/**
 * Clamp window position to viewport bounds
 */
export const clampWindowPosition = (x, y, width, height, taskbarHeight = 48) => {
  const maxX = window.innerWidth - width
  const maxY = window.innerHeight - height - taskbarHeight
  
  return {
    x: clamp(x, 0, maxX),
    y: clamp(y, 0, maxY)
  }
}

/**
 * Detect snap zone based on cursor position
 */
export const detectSnapZone = (x, y, threshold = 10) => {
  if (y < threshold) return 'top'
  if (x < threshold) return 'left'
  if (x > window.innerWidth - threshold) return 'right'
  return null
}

/**
 * Get snap dimensions for a given snap zone
 */
export const getSnapDimensions = (zone, taskbarHeight = 48) => {
  const viewportHeight = window.innerHeight - taskbarHeight
  
  switch (zone) {
    case 'top':
      return {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: viewportHeight
      }
    case 'left':
      return {
        x: 0,
        y: 0,
        width: window.innerWidth / 2,
        height: viewportHeight
      }
    case 'right':
      return {
        x: window.innerWidth / 2,
        y: 0,
        width: window.innerWidth / 2,
        height: viewportHeight
      }
    default:
      return null
  }
}

/**
 * Calculate centered window position
 */
export const getCenteredPosition = (width, height, taskbarHeight = 48) => {
  return {
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height - taskbarHeight) / 2
  }
}

/**
 * Generate unique window ID
 */
export const generateWindowId = (appId) => {
  return `${appId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export const throttle = (func, limit) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
