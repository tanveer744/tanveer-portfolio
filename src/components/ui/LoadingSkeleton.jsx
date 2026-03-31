import React from 'react'

const LoadingSkeleton = ({ variant = 'default', width = '100%', height = '20px', className = '' }) => {
  const variants = {
    default: 'bg-gray-200 dark:bg-gray-700',
    card: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    text: 'bg-gray-300 dark:bg-gray-600 rounded-md',
    circle: 'bg-gray-300 dark:bg-gray-600 rounded-full',
    window: 'bg-[#202020] border border-[#3c3c3c] rounded-lg shadow-xl'
  }

  const baseClasses = `
    animate-pulse 
    ${variants[variant]} 
    ${className}
  `.trim()

  if (variant === 'window') {
    return (
      <div 
        className={baseClasses}
        style={{ width, height: height || '400px' }}
      >
        {/* Window Title Bar */}
        <div className="flex items-center justify-between p-3 border-b border-[#3c3c3c]">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
            <div className="w-24 h-3 bg-gray-500 dark:bg-gray-400 rounded"></div>
          </div>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-sm"></div>
            <div className="w-3 h-3 bg-gray-500 dark:bg-gray-400 rounded-sm"></div>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-4 space-y-3">
          <div className="w-3/4 h-4 bg-gray-500 dark:bg-gray-400 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-500 dark:bg-gray-400 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-500 dark:bg-gray-400 rounded"></div>
          
          <div className="space-y-2 mt-6">
            <div className="w-full h-3 bg-gray-600 dark:bg-gray-500 rounded"></div>
            <div className="w-4/5 h-3 bg-gray-600 dark:bg-gray-500 rounded"></div>
            <div className="w-3/5 h-3 bg-gray-600 dark:bg-gray-500 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div 
        className={baseClasses + ' p-4 rounded-lg'}
        style={{ width, height }}
      >
        <div className="space-y-3">
          <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-3/4 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-1/2 h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={baseClasses}
      style={{ width, height }}
    />
  )
}

// Pre-built skeleton compositions for common use cases
export const WindowSkeleton = (props) => (
  <LoadingSkeleton variant="window" {...props} />
)

export const TextSkeleton = ({ lines = 1, ...props }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <LoadingSkeleton 
        key={i}
        variant="text" 
        height="16px"
        width={i === lines - 1 ? '60%' : '100%'}
        {...props} 
      />
    ))}
  </div>
)

export const CardSkeleton = (props) => (
  <LoadingSkeleton variant="card" height="120px" {...props} />
)

export const CircleSkeleton = ({ size = '40px', ...props }) => (
  <LoadingSkeleton 
    variant="circle" 
    width={size} 
    height={size} 
    {...props} 
  />
)

export default LoadingSkeleton