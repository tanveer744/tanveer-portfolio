import { useState, useEffect, useRef } from 'react'
import { useStore } from '@/stores'
import { apps } from '@/config/apps'

// Define searchable items including social media and projects
const searchableItems = [
  ...apps.map(app => ({
    type: 'app',
    ...app
  })),
  // Social Media
  {
    id: 'github-profile',
    type: 'social',
    title: 'GitHub Profile',
    description: 'View my GitHub profile and repositories',
    icon: '/img/icons/github.png',
    url: 'https://github.com/tanveer744',
    category: 'Social Media'
  },
  {
    id: 'linkedin-profile',
    type: 'social',
    title: 'LinkedIn Profile',
    description: 'Connect with me on LinkedIn',
    icon: '/img/icons/linkedin.png',
    url: 'https://www.linkedin.com/in/shaik-tanveer-lohare/',
    category: 'Social Media'
  },
  {
    id: 'instagram-profile',
    type: 'social',
    title: 'Instagram Profile',
    description: 'Follow me on Instagram',
    icon: '/img/icons/instagram.png',
    url: 'https://www.instagram.com/shaiktanveer_74?igsh=NzZ4NWl1NHI4NXZ2',
    category: 'Social Media'
  },
  // Add more projects here
  {
    id: 'portfolio-project',
    type: 'project',
    title: 'Portfolio Website',
    description: 'My personal portfolio website',
    icon: '/img/icons/vscode.png', // You can add a portfolio icon
    url: 'https://yourportfolio.com', // Update with your portfolio URL
    category: 'Projects'
  }
]

export default function WindowsSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const { addWindow, setShowSearch } = useStore()
  const inputRef = useRef(null)

  // Auto-focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleAppClick = (app) => {
    if (app.url) {
      window.open(app.url, '_blank')
    } else {
      const newWindow = {
        id: `${app.id}-${Date.now()}`,
        appId: app.id,
        title: app.title,
        icon: app.icon,
        width: app.width || 800,
        height: app.height || 600,
        x: 100,
        y: 50,
        minimized: false,
        maximized: false,
      }
      addWindow(newWindow)
    }
    setShowSearch(false)
  }

  const filteredItems = searchQuery
    ? searchableItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  return (
    <div 
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[600px] animate-slide-up"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Container */}
      <div className="rounded-win acrylic border border-white/20 shadow-win overflow-hidden">
        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type here to search"
              className="w-full px-4 py-4 pl-12 text-lg rounded-win-sm bg-white/80 dark:bg-gray-800/80 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-win-accent focus:border-transparent transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setShowSearch(false)
                }
              }}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
              🔍
            </span>
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="px-4 pb-4">
            {filteredItems.length > 0 ? (
              <div className="space-y-4">
                {['Social Media', 'Projects', 'Apps'].map(category => {
                  const categoryItems = filteredItems.filter(item => 
                    item.category === category || 
                    (category === 'Apps' && !item.category)
                  )
                  
                  if (categoryItems.length === 0) return null
                  
                  return (
                    <div key={category}>
                      <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 px-2">
                        {category.toUpperCase()}
                      </div>
                      <div className="space-y-1">
                        {categoryItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => item.url ? window.open(item.url, '_blank') : handleAppClick(item)}
                            className="w-full flex items-center gap-4 p-3 rounded-win-sm hover:bg-white/70 dark:hover:bg-white/10 active:bg-white/50 dark:active:bg-white/5 transition-all group"
                          >
                            <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                              {item.icon?.startsWith('/') ? (
                                <img src={item.icon} alt={item.title} className="w-6 h-6" />
                              ) : (
                                <div className="text-2xl">{item.icon}</div>
                              )}
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.description || item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
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
