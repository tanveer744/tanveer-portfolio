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
      className="w-full h-full relative cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Click to unlock"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick()
        }
      }}
      style={{
        backgroundImage: 'url(/img/wallpapers/windows-wallpaper2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Slide up animation prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm group-hover:text-white/90 transition-all duration-300 animate-slide-up-hint" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
        <div className="flex flex-col items-center gap-2">
          <svg className="w-6 h-6 animate-bounce-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span>Click anywhere to unlock</span>
        </div>
      </div>

      {/* Bottom Left: Time and Date (Windows 11 Style) */}
      <div className="absolute bottom-20 left-8">
        <div 
          className="text-white font-light mb-2"
          style={{ 
            fontFamily: 'Segoe UI Light, Segoe UI, sans-serif',
            fontSize: '72px',
            lineHeight: '1',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)'
          }}
        >
          {formatTime(currentTime)}
        </div>
        <div 
          className="text-white font-normal"
          style={{ 
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '18px',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}
        >
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Bottom right: System icons */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4 text-white/80">
        {/* WiFi icon */}
        <svg className="w-5 h-5 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
        </svg>

        {/* Volume/Sound icon */}
        <svg className="w-5 h-5 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>

        {/* Battery icon */}
        <svg className="w-6 h-6 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6a2 2 0 00-2 2v8a2 2 0 002 2h13a2 2 0 002-2v-2h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2V8a2 2 0 00-2-2H4zm0 2h13v8H4V8z" />
          <path d="M5 9h10v6H5V9z" />
        </svg>
      </div>

      <style>{`
        @keyframes slide-up-hint {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        .animate-slide-up-hint {
          animation: slide-up-hint 3s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
