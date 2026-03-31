import { Component } from 'react'
import { IoAlertCircleOutline, IoRefreshOutline, IoCloseOutline } from 'react-icons/io5'

/**
 * ErrorBoundary - Catches JavaScript errors in child components
 * Displays a user-friendly error UI instead of crashing the entire app
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Error Header */}
            <div className="bg-red-500 dark:bg-red-600 p-4 flex items-center gap-3">
              <IoAlertCircleOutline className="w-8 h-8 text-white flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white">Something went wrong</h2>
                <p className="text-sm text-red-100">
                  {this.props.componentName || 'This component'} encountered an error
                </p>
              </div>
            </div>

            {/* Error Details */}
            <div className="p-6 space-y-4">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="mb-2">
                  The application encountered an unexpected error. This has been logged for investigation.
                </p>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      Technical Details
                    </summary>
                    <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-700 text-xs font-mono overflow-auto max-h-48">
                      <div className="text-red-600 dark:text-red-400 font-bold mb-2">
                        {this.state.error.toString()}
                      </div>
                      {this.state.errorInfo && (
                        <pre className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </div>
                  </details>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={this.handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <IoRefreshOutline className="w-4 h-4" />
                  Try Again
                </button>
                {this.props.onClose && (
                  <button
                    onClick={this.props.onClose}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex items-center gap-2"
                    title="Close"
                  >
                    <IoCloseOutline className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Help Text */}
              <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                💡 Tip: Try refreshing the page or reopening the application
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
