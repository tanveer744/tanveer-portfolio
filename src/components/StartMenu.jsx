import { useState } from 'react'
import { FiSearch, FiPower, FiUser } from 'react-icons/fi'
import { useStore } from '@/stores'
import { apps } from '@/config/apps'
import { startMenuProjects } from '@/config/wallpapers'
import { getCenteredPosition } from '@/constants/layout'

export default function StartMenu() {
  const [searchQuery, setSearchQuery] = useState('')
  const { addWindow, setShowStartMenu, user, powerOff } = useStore()

  const handleAppClick = (app) => {
    // If it's an external link (like GitHub), open it
    if (app.link) {
      window.open(app.link, '_blank')
      setShowStartMenu(false)
      return
    }

    // Otherwise open as a window
    const width = app.width || 800
    const height = app.height || 600
    const { x, y } = getCenteredPosition(width, height)
    
    const newWindow = {
      id: `${app.id}-${Date.now()}`,
      appId: app.id,
      title: app.title,
      icon: app.icon,
      width: width,
      height: height,
      x: x,
      y: y,
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
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
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

        {/* Social Media Links */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/20 dark:bg-black/20">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Connect with me
          </h3>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.open('https://www.linkedin.com/in/shaik-tanveer-lohare/', '_blank')}
              className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
            <button 
              onClick={() => window.open('https://www.instagram.com/shaiktanveer_74?igsh=NzZ4NWl1NHI4NXZ2', '_blank')}
              className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
              title="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="url(#insta-gradient)">
                <defs>
                  <linearGradient id="insta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="5%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="60%" stopColor="#d6249f" />
                    <stop offset="90%" stopColor="#285AEB" />
                  </linearGradient>
                </defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.7-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </button>
            <button 
              onClick={() => window.open('https://github.com/tanveer744', '_blank')}
              className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-white/10 transition-colors"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800 dark:text-white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Footer - User Profile & Power */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/20 dark:bg-black/20">
          {/* User Profile */}
          <button className="flex items-center gap-3 px-3 py-2 rounded-win-sm hover:bg-white/50 dark:hover:bg-white/10 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <FiUser className="text-gray-700" size={18} />
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {user.name}
            </span>
          </button>

          {/* Power Button */}
          <button
            onClick={powerOff}
            className="w-10 h-10 rounded-win-sm hover:bg-white/50 dark:hover:bg-white/10 active:bg-white/30 dark:active:bg-white/5 transition-all flex items-center justify-center text-gray-800 dark:text-gray-200"
            title="Power"
          >
            <FiPower size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
