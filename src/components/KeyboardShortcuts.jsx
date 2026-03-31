import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { Z_INDEX } from '@/constants/zIndex'

/**
 * Keyboard Shortcuts Help Panel
 * Displays all available keyboard shortcuts in the portfolio
 */
export default function KeyboardShortcuts({ onClose }) {
  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const shortcuts = [
    {
      category: 'System',
      items: [
        { keys: ['Win'], description: 'Open/close Start Menu' },
        { keys: ['Win', 'S'], description: 'Open Windows Search' },
        { keys: ['Win', 'A'], description: 'Open Quick Settings' },
        { keys: ['Esc'], description: 'Close active panel/menu' },
        { keys: ['?'], description: 'Show this help panel' },
      ]
    },
    {
      category: 'Windows',
      items: [
        { keys: ['Alt', 'F4'], description: 'Close active window' },
        { keys: ['Win', '↑'], description: 'Maximize window' },
        { keys: ['Win', '↓'], description: 'Restore/minimize window' },
        { keys: ['Win', '←'], description: 'Snap window to left' },
        { keys: ['Win', '→'], description: 'Snap window to right' },
        { keys: ['Ctrl', 'Tab'], description: 'Switch between windows' },
      ]
    },
    {
      category: 'Desktop',
      items: [
        { keys: ['F5'], description: 'Refresh desktop' },
        { keys: ['Right Click'], description: 'Open context menu' },
        { keys: ['Ctrl', 'A'], description: 'Select all icons' },
        { keys: ['Delete'], description: 'Delete selected items' },
        { keys: ['Enter'], description: 'Open selected item' },
      ]
    },
    {
      category: 'Terminal',
      items: [
        { keys: ['help'], description: 'Show available commands' },
        { keys: ['clear'], description: 'Clear terminal screen' },
        { keys: ['↑', '↓'], description: 'Navigate command history' },
        { keys: ['Tab'], description: 'Auto-complete command' },
        { keys: ['Ctrl', 'C'], description: 'Cancel current command' },
      ]
    },
    {
      category: 'Notepad',
      items: [
        { keys: ['Ctrl', 'F'], description: 'Find text' },
        { keys: ['Ctrl', '+'], description: 'Zoom in' },
        { keys: ['Ctrl', '-'], description: 'Zoom out' },
        { keys: ['Ctrl', '0'], description: 'Reset zoom' },
        { keys: ['Alt', 'F'], description: 'Open file menu' },
      ]
    }
  ]

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: Z_INDEX.modals }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden animate-window-open"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-12 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-between px-4 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">⌨️</span>
            <h2 className="text-sm font-semibold">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded transition-colors"
            title="Close (Esc)"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-3rem)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shortcuts.map((section) => (
              <div key={section.category} className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {item.keys.map((key, keyIdx) => (
                          <span key={keyIdx} className="inline-flex">
                            <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded shadow-sm">
                              {key}
                            </kbd>
                            {keyIdx < item.keys.length - 1 && (
                              <span className="mx-1 text-gray-400">+</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer tip */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-800 dark:text-blue-300">
              <strong>💡 Pro Tip:</strong> Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded">?</kbd> anytime to view this shortcuts panel
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
