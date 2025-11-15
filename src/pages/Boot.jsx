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
      <div className="flex flex-col items-center gap-8 animate-fade-in">
        {/* Windows 11 Loading Spinner - 12 dots circular */}
        <div className="relative w-14 h-14">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 30}deg) translateY(-20px)`,
                opacity: 1 - (i * 0.08),
                animation: `spin-fade 1.2s linear infinite`,
                animationDelay: `${-i * 0.1}s`
              }}
            />
          ))}
        </div>
        
        {/* Please wait text */}
        <p className="text-white text-base" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
          Please wait
        </p>
      </div>

      <style>{`
        @keyframes spin-fade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.1;
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
        .animate-fade-in {
          animation: fade-in 0.5s ease-in;
        }
      `}</style>
    </div>
  )
}
