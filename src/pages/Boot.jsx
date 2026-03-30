import { useEffect } from 'react'

export default function Boot({ onComplete }) {
  useEffect(() => {
    // Auto-advance to lock screen after 3 seconds
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-12 animate-fade-in">
        {/* Windows 11 Logo */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-2 w-20 h-20 mb-4">
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-sm animate-logo-fade" style={{ animationDelay: '0s' }} />
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm animate-logo-fade" style={{ animationDelay: '0.1s' }} />
            <div className="bg-gradient-to-br from-blue-300 to-blue-400 rounded-sm animate-logo-fade" style={{ animationDelay: '0.2s' }} />
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-sm animate-logo-fade" style={{ animationDelay: '0.3s' }} />
          </div>
        </div>
        
        {/* Windows 11 Loading Spinner - Improved animation */}
        <div className="relative w-16 h-16">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 30}deg) translateY(-24px)`,
                animation: `spin-dot 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                animationDelay: `${-i * 0.1}s`
              }}
            />
          ))}
        </div>
        
        {/* Please wait text with subtle pulse */}
        <p className="text-white/90 text-base animate-pulse-subtle" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
          Please wait...
        </p>
      </div>

      <style>{`
        @keyframes logo-fade {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-logo-fade {
          animation: logo-fade 0.6s ease-out both;
        }
        
        @keyframes spin-dot {
          0%, 40%, 100% {
            opacity: 0.2;
            transform: rotate(var(--rotate, 0deg)) translateY(-24px) scale(0.8);
          }
          20% {
            opacity: 1;
            transform: rotate(var(--rotate, 0deg)) translateY(-24px) scale(1.2);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.9;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-in;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
