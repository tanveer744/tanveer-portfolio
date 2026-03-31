import { useState, useEffect, useRef } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { Z_INDEX } from '@/constants/zIndex'

/**
 * Windows 11 Style Calendar Popup
 * Shows when clicking on date/time in taskbar
 */
export default function CalendarPopup({ onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isVisible, setIsVisible] = useState(false)
  const calendarRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        onClose()
      }
    }
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const isToday = (day) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    )
  }

  const renderCalendarDays = () => {
    const days = []
    const totalDays = daysInMonth(currentDate)
    const firstDay = firstDayOfMonth(currentDate)

    // Previous month days
    const prevMonthDays = daysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="w-9 h-9 flex items-center justify-center text-white/30 text-sm">
          {prevMonthDays - i}
        </div>
      )
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`w-9 h-9 flex items-center justify-center text-sm rounded-full transition-all ${
            isToday(day)
              ? 'bg-blue-500 text-white font-medium'
              : isSelected(day)
              ? 'bg-white/20 text-white'
              : 'text-white/80 hover:bg-white/10'
          }`}
        >
          {day}
        </button>
      )
    }

    // Next month days
    const remainingCells = 42 - days.length
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="w-9 h-9 flex items-center justify-center text-white/30 text-sm">
          {i}
        </div>
      )
    }

    return days
  }

  return (
    <div
      ref={calendarRef}
      className={`absolute bottom-full right-0 mb-3 transition-all duration-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      style={{ zIndex: Z_INDEX.quickSettings }}
    >
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden w-[280px] sm:w-[320px]">
        {/* Current time display */}
        <div className="p-3 sm:p-4 border-b border-white/10">
          <div className="text-3xl sm:text-4xl font-light text-white">
            {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
          </div>
          <div className="text-white/60 mt-1 text-xs sm:text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <IoChevronBack className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          </button>
          <button
            onClick={goToToday}
            className="text-white/90 font-medium hover:text-white transition-colors text-sm sm:text-base"
          >
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <IoChevronForward className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 px-2 sm:px-3">
          {dayNames.map((day) => (
            <div key={day} className="w-8 sm:w-9 h-7 sm:h-8 flex items-center justify-center text-white/50 text-[10px] sm:text-xs font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 px-2 sm:px-3 pb-3 sm:pb-4">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  )
}
