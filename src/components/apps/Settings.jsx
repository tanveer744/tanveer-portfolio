import { useState } from 'react'
import { useStore } from '@/stores'
import { wallpapersList } from '@/config/wallpapers'
import {
  IoPersonOutline,
  IoColorPaletteOutline,
  IoAppsOutline,
  IoGlobeOutline,
  IoInformationCircleOutline,
  IoCheckmark,
  IoMoon,
  IoSunny
} from 'react-icons/io5'

export default function Settings() {
  const [activeSection, setActiveSection] = useState('personalization')
  const { darkMode, setDarkMode, iconSize, setIconSize, iconSort, setIconSort } = useStore()

  const sections = [
    { id: 'personalization', label: 'Personalization', icon: IoColorPaletteOutline },
    { id: 'system', label: 'System', icon: IoGlobeOutline },
    { id: 'apps', label: 'Apps', icon: IoAppsOutline },
    { id: 'accounts', label: 'Accounts', icon: IoPersonOutline },
    { id: 'about', label: 'About', icon: IoInformationCircleOutline }
  ]

  return (
    <div className="w-full h-full flex bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-56 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 px-2">Settings</h2>
        
        <nav className="space-y-1 flex-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-4xl">
          {activeSection === 'personalization' && <PersonalizationSection />}
          {activeSection === 'system' && <SystemSection />}
          {activeSection === 'apps' && <AppsSection />}
          {activeSection === 'accounts' && <AccountsSection />}
          {activeSection === 'about' && <AboutSection />}
        </div>
      </div>
    </div>
  )
}

function PersonalizationSection() {
  const { darkMode, setDarkMode, iconSize, setIconSize, iconSort, setIconSort, currentWallpaper, setCurrentWallpaper } = useStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Personalization</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Customize your Windows experience</p>
      </div>

      {/* Theme */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Theme</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setDarkMode(false)}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
              !darkMode
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <IoSunny className={`w-6 h-6 ${!darkMode ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900 dark:text-gray-100">Light</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Bright and clean</div>
            </div>
            {!darkMode && <IoCheckmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          </button>

          <button
            onClick={() => setDarkMode(true)}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
              darkMode
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <IoMoon className={`w-6 h-6 ${darkMode ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
            <div className="flex-1 text-left">
              <div className="font-medium text-gray-900 dark:text-gray-100">Dark</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Easy on the eyes</div>
            </div>
            {darkMode && <IoCheckmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          </button>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Desktop Icons</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Icon Size
            </label>
            <div className="flex gap-2">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => setIconSize(size)}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    iconSize === size
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort Icons By
            </label>
            <div className="flex gap-2">
              {['name', 'size', 'type', 'date'].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setIconSort(sort)}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    iconSort === sort
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wallpaper Picker */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Wallpaper</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Choose a background for your desktop
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          {wallpapersList.map((wallpaper) => (
            <button
              key={wallpaper.id}
              onClick={() => setCurrentWallpaper(wallpaper.id)}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                currentWallpaper === wallpaper.id
                  ? 'border-blue-500 ring-2 ring-blue-500/50'
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
            >
              <img
                src={wallpaper.thumbnail}
                alt={wallpaper.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                <p className="text-xs text-white font-medium">{wallpaper.name}</p>
              </div>
              {currentWallpaper === wallpaper.id && (
                <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                  <IoCheckmark className="w-4 h-4 text-white" />
                </div>
              )}
              {wallpaper.theme !== 'both' && (
                <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                  <span className="text-xs text-white flex items-center gap-1">
                    {wallpaper.theme === 'light' ? <IoSunny className="w-3 h-3" /> : <IoMoon className="w-3 h-3" />}
                    {wallpaper.theme}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function SystemSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">System</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Display, sound, and power settings</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Language & Region</h2>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between items-center">
            <span>Language</span>
            <span className="text-gray-500 dark:text-gray-400">English (United States)</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Time Format</span>
            <span className="text-gray-500 dark:text-gray-400">12-hour</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Date Format</span>
            <span className="text-gray-500 dark:text-gray-400">MM/DD/YYYY</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Display</h2>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between items-center">
            <span>Resolution</span>
            <span className="text-gray-500 dark:text-gray-400">{window.innerWidth} × {window.innerHeight}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Refresh Rate</span>
            <span className="text-gray-500 dark:text-gray-400">60 Hz</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Apps</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Manage installed applications</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Installed Apps</h2>
        <div className="space-y-3">
          {['Notepad', 'Terminal', 'Camera', 'Microsoft Edge', 'VS Code'].map((app) => (
            <div key={app} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">{app}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Installed</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AccountsSection() {
  const { user } = useStore()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Accounts</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Your account and sign-in options</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Info</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
            {user.avatar}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Local Account</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AboutSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">About</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Portfolio system information</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">System Specifications</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Edition</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Windows 11 Portfolio Edition</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Version</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Developer</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Shaik Tanveer Lohare</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tech Stack</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-600 dark:text-gray-400 mb-1">Frontend</div>
            <div className="text-gray-900 dark:text-gray-100">React 18.3</div>
            <div className="text-gray-900 dark:text-gray-100">Tailwind CSS 3.4</div>
            <div className="text-gray-900 dark:text-gray-100">Vite 5.2</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400 mb-1">State & Tools</div>
            <div className="text-gray-900 dark:text-gray-100">Zustand 4.5</div>
            <div className="text-gray-900 dark:text-gray-100">Framer Motion 11.1</div>
            <div className="text-gray-900 dark:text-gray-100">React Icons 5.5</div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Portfolio Information</h2>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          This is an interactive Windows 11-inspired portfolio showcasing my projects, skills, and experience.
          Built with modern web technologies to demonstrate frontend development expertise.
        </p>
        <div className="mt-4 flex gap-3">
          <a
            href="https://github.com/tanveer744"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
          >
            View GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shaik-tanveer-lohare/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  )
}
