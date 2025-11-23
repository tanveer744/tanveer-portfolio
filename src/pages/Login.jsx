import { useState, useEffect } from 'react'

const TypingEffect = ({ text, speed = 50, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('')
  
  useEffect(() => {
    let currentIndex = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, speed)
      
      return () => clearInterval(interval)
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [text, speed, delay])
  
  return <span className='inline-block'>{displayText}</span>
}

export default function Login({ onLogin }) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [hintMessage, setHintMessage] = useState('')
  const [showHint, setShowHint] = useState(false)

  const hints = [
    "Hint: Try clicking the ➤ button",
    "Maybe you don't need a PIN 😉",
    "Still trying? Just click the arrow! →"
  ]

  const handleSubmit = (e) => {
    e?.preventDefault()
    
    // Allow entry with empty PIN or correct PIN
    if (pin.length === 0 || pin === '1234') {
      onLogin()
    } else {
      // Wrong PIN entered - trigger easter egg
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      // Shake animation
      setShake(true)
      setTimeout(() => setShake(false), 500)
      
      // Show hint message based on attempt number
      if (newAttempts <= hints.length) {
        setHintMessage(hints[newAttempts - 1])
        setShowHint(true)
        
        // Hide hint after 3 seconds
        setTimeout(() => setShowHint(false), 3000)
      }
      
      // Auto-continue after 3 attempts
      if (newAttempts >= 3) {
        setTimeout(() => {
          onLogin()
        }, 2000)
      }
      
      setPin('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div 
      className="w-full h-full relative"
      style={{
        backgroundImage: 'url(/img/wallpapers/windows-wallpaper2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(40px)',
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-black/20" />
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Login Box - Center */}
      <div className="relative z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
        {/* User Avatar */}
        <div 
          className="w-36 h-36 rounded-full bg-white flex items-center justify-center shadow-2xl"
        >
          <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Username */}
        <h2 
          className="text-white font-normal tracking-wide"
          style={{ 
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '24px'
          }}
        >
          Shaik Tanveer
        </h2>
        
        {/* Welcome Message with typing effect */}
        <div 
          className="text-white/90 text-center mt-1 mb-2 min-h-[48px]"
          style={{
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '16px',
            lineHeight: '1.5',
            maxWidth: '300px',
            opacity: 0,
            animation: 'fadeInUp 0.5s ease-out 0.2s forwards'
          }}
        >
          <TypingEffect 
            text="Welcome to Shaik Tanveer Portfolio" 
            speed={30} 
            delay={100}
          />
          <br />
          <TypingEffect 
            text="Explore my journey as a developer 🚀" 
            speed={30} 
            delay={1000}
          />
        </div>

        {/* PIN Input container */}
        <div className="flex flex-col items-center gap-3 mt-2">
          {/* Keypad icon grid */}
          <div className="grid grid-cols-3 gap-1.5 mb-1">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-2 rounded-full bg-white/70"
              />
            ))}
          </div>

          {/* Enter your PIN text */}
          <p 
            className="text-white/90 mb-1"
            style={{ 
              fontFamily: 'Segoe UI, sans-serif',
              fontSize: '15px'
            }}
          >
            Enter your PIN
          </p>

          {/* PIN Input with arrow button */}
          <div className={`relative ${shake ? 'animate-shake' : ''}`}>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="PIN"
              maxLength={6}
              className="w-80 h-11 px-4 pr-12 rounded bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 focus:outline-none focus:border-blue-500/50 text-white placeholder:text-gray-400 transition-all"
              style={{ 
                fontFamily: 'Segoe UI, sans-serif',
                fontSize: '14px'
              }}
              autoFocus
            />
            {/* Arrow button */}
            <button
              onClick={handleSubmit}
              className="absolute right-0 top-0 h-11 w-11 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-r transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Hint Message */}
          {showHint && (
            <div 
              className="text-yellow-300 text-center mt-2 animate-fade-in px-4 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
              style={{ 
                fontFamily: 'Segoe UI, sans-serif',
                fontSize: '14px',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {hintMessage}
            </div>
          )}

          {/* Auto-continue message after 3 attempts */}
          {attempts >= 3 && (
            <div 
              className="text-green-300 text-center mt-2 animate-fade-in px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20"
              style={{ 
                fontFamily: 'Segoe UI, sans-serif',
                fontSize: '14px'
              }}
            >
              ✨ Fine, I&apos;ll let you in anyway... Welcome! 🎉
            </div>
          )}

          {/* Sign-in options */}
          <button 
            className="text-white/80 hover:text-white transition-colors mt-1"
            style={{ 
              fontFamily: 'Segoe UI, sans-serif',
              fontSize: '13px'
            }}
          >
            Sign-in options
          </button>
        </div>
      </div>

      {/* Bottom right: System tray icons */}
      <div className="absolute bottom-5 right-5 flex items-center gap-5 text-white">
        {/* Language selector */}
        <button 
          className="hover:bg-white/10 px-2 py-1 rounded transition-colors text-center leading-tight"
          style={{ 
            fontFamily: 'Segoe UI, sans-serif',
            fontSize: '13px'
          }}
        >
          ENG<br/>IN
        </button>

        {/* Network icon */}
        <button className="hover:bg-white/10 p-2 rounded transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
          </svg>
        </button>

        {/* Accessibility icon */}
        <button className="hover:bg-white/10 p-2 rounded transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        </button>

        {/* Power button */}
        <button className="hover:bg-white/10 p-2 rounded transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5a1 1 0 11-2 0V4a1 1 0 011-1zM5.293 5.707a1 1 0 011.414 0 6 6 0 108.586 0 1 1 0 011.414-1.414 8 8 0 11-11.314 0 1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}
