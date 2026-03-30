import { useState, useEffect, useRef } from 'react'
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
      className={`absolute bottom-full right-0 mb-3 z-[100] transition-all duration-200 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden w-[360px]">
        {/* Quick toggle buttons */}
        <div className="p-4 grid grid-cols-3 gap-2">
          {quickButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => toggleSetting(btn.id)}
              className={`flex flex-col items-start gap-1 p-3 rounded-lg transition-all ${
                btn.active 
                  ? 'bg-blue-500/80 text-white' 
                  : 'bg-white/10 text-white/80 hover:bg-white/15'
              }`}
            >
              {btn.icon}
              <span className="text-xs font-medium mt-1">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Sliders */}
        <div className="px-4 pb-4 space-y-4">
          {/* Volume slider */}
          <div className="flex items-center gap-3">
            <button className="text-white/80 hover:text-white transition-colors">
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
            <span className="text-white/60 text-sm w-8 text-right">{volume}</span>
          </div>

          {/* Brightness slider */}
          <div className="flex items-center gap-3">
            <button className="text-white/80 hover:text-white transition-colors">
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
            <span className="text-white/60 text-sm w-8 text-right">{brightness}</span>
          </div>
        </div>

        {/* Battery info */}
        <div className="px-4 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/60">
            <IoBatteryFull className="w-5 h-5" />
            <span className="text-sm">97% - Plugged in</span>
          </div>
          <button className="text-blue-400 text-sm hover:underline">
            Battery settings
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
