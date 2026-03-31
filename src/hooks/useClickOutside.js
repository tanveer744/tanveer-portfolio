import { useState, useEffect, useRef } from 'react'

export function useClickOutside(callback) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    // Performance: Use passive listener - we don't call preventDefault
    document.addEventListener('mousedown', handleClickOutside, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [callback])

  return ref
}
