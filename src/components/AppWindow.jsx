import { Rnd } from 'react-rnd'
import { useStore } from '@/stores'

export default function AppWindow({ window }) {
  const { setActiveWindow, removeWindow, minimizeWindow, toggleMaximizeWindow, activeWindow } = useStore()
  const isActive = activeWindow === window.id

  const handleClose = () => {
    removeWindow(window.id)
  }

  const handleMinimize = () => {
    minimizeWindow(window.id)
  }

  const handleMaximize = () => {
    toggleMaximizeWindow(window.id)
  }

  // Don't render minimized windows
  if (window.isMinimized) {
    return null
  }

  return (
    <Rnd
      position={window.isMaximized ? { x: 0, y: 0 } : undefined}
      size={window.isMaximized ? { width: '100%', height: 'calc(100% - 48px)' } : undefined}
      default={{
        x: window.x,
        y: window.y,
        width: window.width,
        height: window.height,
      }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      disableDragging={window.isMaximized}
      enableResizing={!window.isMaximized}
      onMouseDown={() => setActiveWindow(window.id)}
      cancel=".window-content"
      style={{
        zIndex: isActive ? 1000 : 900,
      }}
    >
      <div className={`w-full h-full flex flex-col rounded-win overflow-hidden shadow-win transition-all ${
        isActive ? 'ring-1 ring-win-accent/50' : ''
      }`}>
        
        {/* Title Bar */}
        <div className="h-8 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-3 select-none">
          
          {/* Left - App Icon & Title */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img src={window.icon} alt={window.title} className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
              {window.title}
            </span>
          </div>

          {/* Right - Window Controls */}
          <div className="flex items-center gap-0 flex-shrink-0">
            {/* Minimize */}
            <button
              onClick={handleMinimize}
              className="w-11 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 transition-colors flex items-center justify-center group"
              title="Minimize"
            >
              <svg className="w-3 h-3" viewBox="0 0 12 12">
                <rect x="0" y="5" width="12" height="2" className="fill-gray-700 dark:fill-gray-300" />
              </svg>
            </button>

            {/* Maximize/Restore */}
            <button
              onClick={handleMaximize}
              className="w-11 h-8 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 transition-colors flex items-center justify-center group"
              title={window.isMaximized ? "Restore Down" : "Maximize"}
            >
              {window.isMaximized ? (
                <svg className="w-3 h-3" viewBox="0 0 12 12">
                  <rect x="2" y="2" width="8" height="8" className="fill-none stroke-gray-700 dark:stroke-gray-300 stroke-[1.5]" />
                  <path d="M 2,2 L 2,0 L 12,0 L 12,10 L 10,10" className="fill-none stroke-gray-700 dark:stroke-gray-300 stroke-[1.5]" />
                </svg>
              ) : (
                <svg className="w-3 h-3" viewBox="0 0 12 12">
                  <rect x="0" y="0" width="12" height="12" className="fill-none stroke-gray-700 dark:stroke-gray-300 stroke-[1.5]" />
                </svg>
              )}
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="w-11 h-8 hover:bg-red-500 active:bg-red-600 transition-colors flex items-center justify-center group"
              title="Close"
            >
              <svg className="w-3 h-3" viewBox="0 0 12 12">
                <path
                  d="M 0,0 L 12,12 M 12,0 L 0,12"
                  className="stroke-gray-700 dark:stroke-gray-300 group-hover:stroke-white stroke-[1.5]"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="window-content flex-1 bg-white dark:bg-gray-900 overflow-hidden">
          <AppContent appId={window.appId} />
        </div>
      </div>
    </Rnd>
  )
}

import Notepad from './apps/Notepad'
import Terminal from './apps/Terminal'

// Placeholder content for different apps
function AppContent({ appId }) {
  const contentMap = {
    notepad: <Notepad />,
    edge: <BrowserContent />,
    vscode: <VSCodeContent />,
    terminal: <Terminal />,
    explorer: <ExplorerContent />,
    settings: <SettingsContent />,
  }

  return contentMap[appId] || <DefaultContent appId={appId} />
}

function BrowserContent() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 gap-2">
        <button className="text-gray-500">←</button>
        <button className="text-gray-500">→</button>
        <button className="text-gray-500">↻</button>
        <input
          type="text"
          defaultValue="https://github.com"
          className="flex-1 px-3 py-1 text-sm rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
        />
      </div>
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">🌐</div>
          <div>Browser Content</div>
        </div>
      </div>
    </div>
  )
}

function VSCodeContent() {
  return (
    <div className="w-full h-full bg-[#1e1e1e] text-gray-300 p-4 font-mono text-sm">
      <div className="text-green-400">{'//'} Visual Studio Code</div>
      <div className="mt-2">
        <span className="text-purple-400">function</span>
        <span className="text-yellow-300"> hello</span>
        <span>() {'{'}</span>
      </div>
      <div className="ml-4">
        <span className="text-blue-400">console</span>
        <span>.log(</span>
        <span className="text-orange-400">&quot;Hello, Windows 11!&quot;</span>
        <span>);</span>
      </div>
      <div>{'}'}</div>
    </div>
  )
}

function ExplorerContent() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 gap-2">
        <button className="text-gray-500">←</button>
        <button className="text-gray-500">→</button>
        <button className="text-gray-500">↑</button>
        <div className="flex-1 px-3 py-1 text-sm bg-white dark:bg-gray-700 rounded">
          This PC &gt; Documents
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="space-y-2">
          {['📁 Projects', '📁 Documents', '📁 Pictures', '📄 README.md'].map((item) => (
            <div key={item} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SettingsContent() {
  return (
    <div className="w-full h-full flex">
      <div className="w-48 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-4">
        <div className="space-y-2">
          {['System', 'Personalization', 'Apps', 'Accounts', 'Network'].map((item) => (
            <div key={item} className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded cursor-pointer text-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Configure your Windows experience</p>
      </div>
    </div>
  )
}

function DefaultContent({ appId }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-gray-500">
      <div className="text-center">
        <div className="text-4xl mb-2">📱</div>
        <div>App: {appId}</div>
      </div>
    </div>
  )
}
