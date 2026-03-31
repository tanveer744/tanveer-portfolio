import { IoClose, IoCheckmarkDone, IoTrash, IoNotificationsOutline } from 'react-icons/io5'
import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/stores'
import { Z_INDEX } from '@/constants/zIndex'

/**
 * NotificationPanel - Displays system notifications
 * Slides out from taskbar, similar to QuickSettings
 */
export default function NotificationPanel({ onClose }) {
  const panelRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const { notifications, markNotificationRead, clearAllNotifications, removeNotification } = useStore()

  // Slide-in animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const unreadCount = notifications.filter(n => !n.read).length
  const hasNotifications = notifications.length > 0

  return (
    <div className="fixed inset-0" style={{ zIndex: Z_INDEX.notifications }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-transparent" onClick={onClose} />
      
      {/* Notification Panel */}
      <div
        ref={panelRef}
        className={`absolute bottom-20 right-4 w-96 max-h-[calc(100vh-120px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex flex-col overflow-hidden transition-all duration-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2">
            <IoNotificationsOutline className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                  {unreadCount}
                </span>
              )}
            </h2>
          </div>
          
          <div className="flex items-center gap-1">
            {hasNotifications && (
              <>
                <button
                  onClick={clearAllNotifications}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                  title="Clear all"
                >
                  <IoTrash className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      notifications.filter(n => !n.read).forEach(n => markNotificationRead(n.id))
                    }}
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    title="Mark all as read"
                  >
                    <IoCheckmarkDone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                )}
              </>
            )}
            
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              title="Close"
            >
              <IoClose className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto">
          {!hasNotifications ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 dark:text-gray-400">
              <IoNotificationsOutline className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-sm">No notifications</p>
              <p className="text-xs mt-1 opacity-70">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                    !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                      notification.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    }`}>
                      <span className="text-lg">{notification.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-2">
                        {!notification.read && (
                          <button
                            onClick={() => markNotificationRead(notification.id)}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {hasNotifications && (
          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
