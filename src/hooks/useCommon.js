import { useEffect, useState } from 'react'

/**
 * useClickOutside - Detects clicks outside of a referenced element
 * @param {Object} ref - React ref object for the element
 * @param {Function} handler - Callback function when outside click is detected
 * @param {boolean} enabled - Whether the hook is active (default: true)
 */
export function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, handler, enabled])
}

/**
 * useEscapeKey - Detects Escape key press
 * @param {Function} handler - Callback function when Escape is pressed
 * @param {boolean} enabled - Whether the hook is active (default: true)
 */
export function useEscapeKey(handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleEscape = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        handler(event)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handler, enabled])
}

/**
 * useKeyPress - Detects specific key press
 * @param {string|string[]} targetKey - Key(s) to detect (e.g., 'Enter', ['Control', 's'])
 * @param {Function} handler - Callback function when key is pressed
 * @param {boolean} enabled - Whether the hook is active (default: true)
 */
export function useKeyPress(targetKey, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyPress = (event) => {
      const keys = Array.isArray(targetKey) ? targetKey : [targetKey]
      const isMatch = keys.every(key => {
        if (key === 'Control' || key === 'Ctrl') return event.ctrlKey || event.metaKey
        if (key === 'Shift') return event.shiftKey
        if (key === 'Alt') return event.altKey
        return event.key === key || event.code === key
      })

      if (isMatch) {
        event.preventDefault()
        handler(event)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [targetKey, handler, enabled])
}

/**
 * useInterval - Declarative setInterval hook
 * @param {Function} callback - Function to call on each interval
 * @param {number|null} delay - Delay in milliseconds (null to pause)
 */
export function useInterval(callback, delay) {
  useEffect(() => {
    if (delay === null) return

    const id = setInterval(callback, delay)
    return () => clearInterval(id)
  }, [callback, delay])
}

/**
 * useTimeout - Declarative setTimeout hook
 * @param {Function} callback - Function to call after timeout
 * @param {number|null} delay - Delay in milliseconds (null to cancel)
 */
export function useTimeout(callback, delay) {
  useEffect(() => {
    if (delay === null) return

    const id = setTimeout(callback, delay)
    return () => clearTimeout(id)
  }, [callback, delay])
}

/**
 * useLocalStorage - Persist state in localStorage
 * @param {string} key - localStorage key
 * @param {*} initialValue - Initial value if key doesn't exist
 * @returns {[*, Function]} - [value, setValue] tuple
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * useDebounce - Debounce a value
 * @param {*} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {*} - Debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

/**
 * useMediaQuery - Detect media query match
 * @param {string} query - Media query string
 * @returns {boolean} - Whether the query matches
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    const handler = (event) => setMatches(event.matches)

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler)
      return () => mediaQuery.removeListener(handler)
    }
  }, [query])

  return matches
}

export default {
  useClickOutside,
  useEscapeKey,
  useKeyPress,
  useInterval,
  useTimeout,
  useLocalStorage,
  useDebounce,
  useMediaQuery
}
