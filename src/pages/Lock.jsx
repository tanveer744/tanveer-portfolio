import { useState, useEffect } from 'react'
import { formatTime, formatDate } from '@/utils'

export default function Lock({ onClick }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div 
      className="w-full h-full relative cursor-pointer"
      onClick={onClick}
      style={{
        backgroundImage: 'url(/img/wallpapers/windows-wallpaper2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Top: Enter your PIN text */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 text-white">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
          </svg>
          <span style={{ fontFamily: 'Segoe UI, sans-serif', fontSize: '14px' }}>
            Enter your PIN
          </span>
        </div>
      </div>

      {/* Center: Time and Date */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div 
          className="text-white font-light mb-3"
          style={{ 
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '96px',
            lineHeight: '1',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          {formatTime(currentTime)}
        </div>
        <div 
          className="text-white font-normal"
          style={{ 
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '20px',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {formatDate(currentTime)}
        </div>
        <div 
          className="text-white/80 font-light mt-2"
          style={{
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '14px',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.5s ease-out 0.7s both',
            opacity: 0
          }}
        >
          Press F11 for fullscreen experience
        </div>
      </div>

      {/* Bottom right: System icons */}
      <div className="absolute bottom-6 right-6 flex items-center gap-4 text-white">
        {/* WiFi icon */}
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
        </svg>

        {/* Volume/Sound icon */}
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>

        {/* Battery icon */}
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6a2 2 0 00-2 2v8a2 2 0 002 2h13a2 2 0 002-2v-2h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2V8a2 2 0 00-2-2H4zm0 2h13v8H4V8z" />
          <path d="M5 9h10v6H5V9z" />
        </svg>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
