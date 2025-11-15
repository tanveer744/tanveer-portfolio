import { useState } from 'react'
import { useStore } from '@/stores'
import { apps } from '@/config/apps'
import { startMenuProjects } from '@/config/wallpapers'

export default function StartMenu() {
  const [searchQuery, setSearchQuery] = useState('')
  const { addWindow, setShowStartMenu, user } = useStore()

  const handleAppClick = (app) => {
    // If it's an external link (like GitHub), open it
    if (app.link) {
      window.open(app.link, '_blank')
      setShowStartMenu(false)
      return
    }

    // Otherwise open as a window
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
    setShowStartMenu(false)
  }

  const handleProjectClick = (project) => {
    window.open(project.link, '_blank')
    setShowStartMenu(false)
  }

  const desktopApps = apps.filter(app => app.desktop)
  const filteredProjects = searchQuery
    ? startMenuProjects.filter(proj => proj.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : startMenuProjects

  return (
    <div className="fixed bottom-14 left-0 right-0 mx-auto w-[640px] z-50 animate-slide-up will-change-transform">
      {/* Start Menu Container */}
      <div className="w-[640px] rounded-win acrylic border border-white/20 shadow-win overflow-hidden">
        
        {/* Search Box */}
        <div className="p-6 pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for apps, settings, and documents"
              className="w-full px-4 py-3 pl-10 rounded-win-sm bg-white/50 dark:bg-black/30 border border-gray-300/50 dark:border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-win-accent focus:border-transparent transition-all"
              autoFocus
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              🔍
            </span>
          </div>
        </div>

        {/* Pinned Apps Section */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Pinned
            </h3>
            <button className="text-xs text-win-accent hover:underline">
              All apps →
            </button>
          </div>

          {/* Apps Grid - Desktop Apps */}
          <div className="grid grid-cols-6 gap-2">
            {desktopApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppClick(app)}
                className="flex flex-col items-center gap-2 p-3 rounded-win-sm hover:bg-white/50 dark:hover:bg-white/10 active:bg-white/30 dark:active:bg-white/5 transition-all group"
                title={app.title}
              >
                <img src={app.icon} alt={app.title} className="w-10 h-10 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-800 dark:text-gray-200 text-center line-clamp-2 leading-tight">
                  {app.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Projects Section */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              My Projects
            </h3>
          </div>

          {/* Project Links */}
          <div className="grid grid-cols-2 gap-2">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="flex items-center gap-3 p-2 rounded-win-sm hover:bg-white/50 dark:hover:bg-white/10 transition-all"
              >
                <img src={project.img} alt={project.title} className="w-8 h-8" />
                <div className="flex-1 text-left">
                  <div className="text-sm text-gray-800 dark:text-gray-200 truncate">
                    {project.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer - User Profile & Power */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/20 dark:bg-black/20">
          {/* User Profile */}
          <button className="flex items-center gap-3 px-3 py-2 rounded-win-sm hover:bg-white/50 dark:hover:bg-white/10 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-lg">
              {user.avatar}
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {user.name}
            </span>
          </button>

          {/* Power Button */}
          <button
            className="w-10 h-10 rounded-win-sm hover:bg-white/50 dark:hover:bg-white/10 active:bg-white/30 dark:active:bg-white/5 transition-all flex items-center justify-center text-gray-800 dark:text-gray-200"
            title="Power"
          >
            ⏻
          </button>
        </div>
      </div>
    </div>
  )
}
