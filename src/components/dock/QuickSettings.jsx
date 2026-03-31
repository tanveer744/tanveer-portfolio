import { useState, useEffect, useRef } from 'react'
import { Z_INDEX } from '@/constants/zIndex'
import { useStore } from '@/stores'
import {
  IoWifiSharp, 
  IoBluetoothSharp, 
  IoAirplane, 
  IoBatteryFull,
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeMute,
  IoSunny,
  IoMoon,
  IoAccessibility,
  IoLocationSharp
} from 'react-icons/io5'

/**
 * Windows 11 Style Quick Settings Panel
 * Flyout panel with WiFi, Bluetooth, Volume, Brightness controls
 */
export default function QuickSettings({ onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const [volume, setVolume] = useState(75)
  const [brightness, setBrightness] = useState(100)
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
    nightLight: false,
    location: true,
    accessibility: false
  })
  const panelRef = useRef(null)
  
  // Get dark mode state from store
  const { darkMode, setDarkMode } = useStore()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
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

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const getVolumeIcon = () => {
    if (volume === 0) return <IoVolumeMute className="w-5 h-5" />
    if (volume < 33) return <IoVolumeLow className="w-5 h-5" />
    if (volume < 66) return <IoVolumeMedium className="w-5 h-5" />
    return <IoVolumeHigh className="w-5 h-5" />
  }

  const quickButtons = [
    { 
      id: 'darkMode', 
      icon: darkMode ? <IoMoon className="w-5 h-5" /> : <IoSunny className="w-5 h-5" />, 
      label: darkMode ? 'Dark mode' : 'Light mode', 
      active: darkMode,
      onClick: () => setDarkMode(!darkMode)
    },
    { id: 'wifi', icon: <IoWifiSharp className="w-5 h-5" />, label: 'Wi-Fi', active: settings.wifi },
    { id: 'bluetooth', icon: <IoBluetoothSharp className="w-5 h-5" />, label: 'Bluetooth', active: settings.bluetooth },
    { id: 'airplane', icon: <IoAirplane className="w-5 h-5" />, label: 'Airplane mode', active: settings.airplane },
    { id: 'nightLight', icon: <IoMoon className="w-5 h-5" />, label: 'Night light', active: settings.nightLight },
    { id: 'location', icon: <IoLocationSharp className="w-5 h-5" />, label: 'Location', active: settings.location },
    { id: 'accessibility', icon: <IoAccessibility className="w-5 h-5" />, label: 'Accessibility', active: settings.accessibility },
  ]

  return (
    <div
      ref={panelRef}
      className={`absolute bottom-full right-0 mb-3 transition-all duration-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      style={{ zIndex: Z_INDEX.quickSettings }}
    >
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden w-[280px] sm:w-[320px] md:w-[360px]">
        {/* Quick toggle buttons */}
        <div className="p-3 sm:p-4 grid grid-cols-3 gap-1.5 sm:gap-2">
          {quickButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => btn.onClick ? btn.onClick() : toggleSetting(btn.id)}
              className={`flex flex-col items-start gap-1 p-2 sm:p-3 rounded-lg transition-all ${
                btn.active 
                  ? 'bg-blue-500/80 text-white' 
                  : 'bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              {btn.icon}
              <span className="text-[10px] sm:text-xs font-medium mt-0.5 sm:mt-1 truncate w-full">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Sliders */}
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3 sm:space-y-4">
          {/* Volume slider */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="text-white/80 hover:text-white transition-colors flex-shrink-0">
              {getVolumeIcon()}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white 
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <span className="text-white/60 text-xs sm:text-sm w-6 sm:w-8 text-right">{volume}</span>
          </div>

          {/* Brightness slider */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="text-white/80 hover:text-white transition-colors flex-shrink-0">
              <IoSunny className="w-5 h-5" />
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white 
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <span className="text-white/60 text-xs sm:text-sm w-6 sm:w-8 text-right">{brightness}</span>
          </div>
        </div>

        {/* Battery info */}
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/60">
            <IoBatteryFull className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm">97% - Plugged in</span>
          </div>
          <button className="text-blue-400 text-xs sm:text-sm hover:underline">
            Settings
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
          <button className="text-white/70 hover:text-white text-sm transition-colors">
            ⚙️ All settings
          </button>
          <button className="text-white/70 hover:text-white text-sm transition-colors">
            ✏️ Edit quick settings
          </button>
        </div>
      </div>
    </div>
  )
}
