/**
 * LoadingSpinner - Reusable loading indicator component
 * Used across apps for consistent loading experience
 */
export default function LoadingSpinner({ size = 'md', message, className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div 
        className={`${sizes[size]} border-gray-200 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {message}
        </div>
      )}
    </div>
  )
}
