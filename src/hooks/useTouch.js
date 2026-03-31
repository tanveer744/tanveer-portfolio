import { useCallback, useRef } from 'react'

/**
 * Hook to handle both mouse and touch events for drag operations
 * Normalizes touch and mouse events into a unified interface
 * 
 * @param {Object} handlers - Event handler callbacks
 * @param {Function} handlers.onStart - Called when drag starts (mousedown/touchstart)
 * @param {Function} handlers.onMove - Called during drag (mousemove/touchmove)
 * @param {Function} handlers.onEnd - Called when drag ends (mouseup/touchend)
 * @param {Object} options - Configuration options
 * @param {boolean} options.preventDefault - Whether to preventDefault on touch events
 * @returns {Object} - Event handlers to spread onto the target element
 */
export function useTouch(handlers = {}, options = {}) {
  const { onStart, onMove, onEnd } = handlers
  const { preventDefault = true } = options
  
  // Track if we're currently in a touch interaction
  const isTouching = useRef(false)

  /**
   * Normalize mouse or touch event to get clientX/clientY
   * @param {MouseEvent|TouchEvent} e - The event object
   * @returns {{ clientX: number, clientY: number }} - Normalized coordinates
   */
  const getEventCoordinates = useCallback((e) => {
    if (e.touches && e.touches.length > 0) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      }
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return {
        clientX: e.changedTouches[0].clientX,
        clientY: e.changedTouches[0].clientY
      }
    }
    return {
      clientX: e.clientX,
      clientY: e.clientY
    }
  }, [])

  /**
   * Handle mouse down event
   */
  const handleMouseDown = useCallback((e) => {
    // Don't handle mouse events if we're in a touch interaction
    if (isTouching.current) return
    
    const coords = getEventCoordinates(e)
    onStart?.({
      ...coords,
      target: e.target,
      originalEvent: e,
      isTouch: false
    })
  }, [onStart, getEventCoordinates])

  /**
   * Handle touch start event
   */
  const handleTouchStart = useCallback((e) => {
    isTouching.current = true
    
    if (preventDefault) {
      e.preventDefault()
    }
    
    const coords = getEventCoordinates(e)
    onStart?.({
      ...coords,
      target: e.target,
      originalEvent: e,
      isTouch: true
    })
  }, [onStart, getEventCoordinates, preventDefault])

  /**
   * Handle mouse move event (to be added to window)
   */
  const handleMouseMove = useCallback((e) => {
    if (isTouching.current) return
    
    const coords = getEventCoordinates(e)
    onMove?.({
      ...coords,
      originalEvent: e,
      isTouch: false
    })
  }, [onMove, getEventCoordinates])

  /**
   * Handle touch move event (to be added to window)
   */
  const handleTouchMove = useCallback((e) => {
    if (preventDefault) {
      e.preventDefault()
    }
    
    const coords = getEventCoordinates(e)
    onMove?.({
      ...coords,
      originalEvent: e,
      isTouch: true
    })
  }, [onMove, getEventCoordinates, preventDefault])

  /**
   * Handle mouse up event (to be added to window)
   */
  const handleMouseUp = useCallback((e) => {
    if (isTouching.current) return
    
    const coords = getEventCoordinates(e)
    onEnd?.({
      ...coords,
      originalEvent: e,
      isTouch: false
    })
  }, [onEnd, getEventCoordinates])

  /**
   * Handle touch end event (to be added to window)
   */
  const handleTouchEnd = useCallback((e) => {
    isTouching.current = false
    
    const coords = getEventCoordinates(e)
    onEnd?.({
      ...coords,
      originalEvent: e,
      isTouch: true
    })
  }, [onEnd, getEventCoordinates])

  return {
    // Element handlers (attach to the draggable element)
    elementHandlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart
    },
    // Window handlers (attach to window during drag)
    windowHandlers: {
      mouseMove: handleMouseMove,
      touchMove: handleTouchMove,
      mouseUp: handleMouseUp,
      touchEnd: handleTouchEnd
    },
    // Helper to add all window listeners
    addWindowListeners: () => {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchend', handleTouchEnd)
    },
    // Helper to remove all window listeners
    removeWindowListeners: () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchend', handleTouchEnd)
    },
    // Utility function to get coordinates from any event
    getEventCoordinates
  }
}

/**
 * Simple hook to detect if current device supports touch
 * Re-exports the utility function as a hook for React components
 */
export function useTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Hook to track if user is using touch vs mouse
 * Updates dynamically based on last interaction type
 */
export function useInputMethod() {
  const inputMethod = useRef('mouse')
  
  const handleTouch = useCallback(() => {
    inputMethod.current = 'touch'
  }, [])
  
  const handleMouse = useCallback(() => {
    inputMethod.current = 'mouse'
  }, [])
  
  return {
    inputMethod: inputMethod.current,
    trackTouch: handleTouch,
    trackMouse: handleMouse
  }
}
