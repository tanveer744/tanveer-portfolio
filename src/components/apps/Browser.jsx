import { useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaRedo, FaHome, FaLock } from 'react-icons/fa'

export default function Browser({ windowData }) {
  const [url, setUrl] = useState('https://github.com/tanveer744')
  const [history, setHistory] = useState(['https://github.com/tanveer744'])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const bookmarks = [
    { name: 'My GitHub', url: 'https://github.com/tanveer744' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/tanveer-ahmed-744' },
    { name: 'Portfolio Projects', url: 'https://github.com/tanveer744?tab=repositories' },
  ]

  const handleNavigate = (newUrl) => {
    if (!newUrl.startsWith('http')) {
      newUrl = `https://${newUrl}`
    }
    
    setUrl(newUrl)
    setIsLoading(true)
    
    // Add to history
    const newHistory = [...history.slice(0, currentIndex + 1), newUrl]
    setHistory(newHistory)
    setCurrentIndex(newHistory.length - 1)
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      setUrl(history[newIndex])
    }
  }

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      setUrl(history[newIndex])
    }
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 800)
  }

  const openExternal = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Navigation Bar */}
      <div className="h-12 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 gap-2">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Back"
        >
          <FaArrowLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleForward}
          disabled={currentIndex >= history.length - 1}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Forward"
        >
          <FaArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={handleRefresh}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Refresh"
        >
          <FaRedo className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={() => handleNavigate('https://github.com/tanveer744')}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Home"
        >
          <FaHome className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center gap-2">
          <FaLock className="w-3 h-3 text-green-600" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNavigate(url)}
            className="flex-1 px-3 py-1 text-sm rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
          />
        </div>

        <button
          onClick={openExternal}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open External
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div className="h-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Bookmarks:</span>
        {bookmarks.map((bookmark, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(bookmark.url)}
            className="px-3 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {bookmark.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        ) : (
          <div className="max-w-md space-y-6">
            <div className="text-6xl mb-4">🌐</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Portfolio Browser
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              This is a demo browser component. For security reasons, external content cannot be embedded directly.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Current URL: <span className="font-mono text-blue-600 dark:text-blue-400">{url}</span>
              </p>
              <button
                onClick={openExternal}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Open in New Tab
              </button>
            </div>
            
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                💡 This browser showcases UI patterns and navigation concepts. 
                Real browsing happens in external tabs for security.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center px-4 text-xs text-gray-600 dark:text-gray-400">
        {isLoading ? (
          <span>Loading {url}...</span>
        ) : (
          <span>Ready - Click "Open External" to browse safely</span>
        )}
      </div>
    </div>
  )
}