import { useState } from 'react'
import { useStore } from '@/stores'
import { apps } from '@/config/apps'

export default function WindowsSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const { addWindow, setShowSearch } = useStore()

  const handleAppClick = (app) => {
    const newWindow = {
      id: `${app.id}-${Date.now()}`,
      appId: app.id,
      title: app.title,
      icon: app.icon,
      width: app.width,
      height: app.height,
      x: 100,
      y: 50,
      minimized: false,
      maximized: false,
    }
    addWindow(newWindow)
    setShowSearch(false)
  }

  const filteredApps = searchQuery
    ? apps.filter(app => app.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[600px] animate-slide-up">
      {/* Search Container */}
      <div className="rounded-win acrylic border border-white/20 shadow-win overflow-hidden">
        
        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type here to search"
              className="w-full px-4 py-4 pl-12 text-lg rounded-win-sm bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-win-accent focus:border-transparent transition-all"
              autoFocus
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
              🔍
            </span>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="px-4 pb-4">
            {filteredApps.length > 0 ? (
              <>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 px-2">
                  APPS
                </div>
                <div className="space-y-1">
                  {filteredApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleAppClick(app)}
                      className="w-full flex items-center gap-4 p-3 rounded-win-sm hover:bg-white/70 dark:hover:bg-white/10 active:bg-white/50 dark:active:bg-white/5 transition-all group"
                    >
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {app.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {app.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          App
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🔍</div>
                <div className="text-sm">No results found</div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions when no search query */}
        {!searchQuery && (
          <div className="px-4 pb-4">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 px-2">
              QUICK SEARCHES
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Documents', 'Photos', 'Settings', 'Downloads'].map((item) => (
                <button
                  key={item}
                  className="flex items-center gap-3 p-3 rounded-win-sm hover:bg-white/70 dark:hover:bg-white/10 transition-all"
                >
                  <span className="text-2xl">📁</span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
