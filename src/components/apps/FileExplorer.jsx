import { useState } from 'react'
import { FaFolder, FaFolderOpen, FaFile, FaChevronRight, FaHome, FaDownload } from 'react-icons/fa'
import { terminal } from '@/config/terminal'

export default function FileExplorer({ windowData }) {
  const [currentPath, setCurrentPath] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  // Get current folder contents based on path
  const getCurrentFolder = () => {
    if (currentPath.length === 0) {
      return { title: 'Resume', children: terminal, type: 'folder' }
    }

    let current = null
    for (const pathId of currentPath) {
      if (!current) {
        current = terminal.find(item => item.id === pathId)
      } else {
        current = current.children?.find(item => item.id === pathId)
      }
    }
    return current || { title: 'Resume', children: terminal, type: 'folder' }
  }

  const currentFolder = getCurrentFolder()
  const items = currentFolder.children || []

  // Navigate into a folder
  const handleItemClick = (item) => {
    setSelectedItem(item.id)
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item.id])
    }
  }

  // Handle double-click on file to open/download
  const handleItemDoubleClick = async (item) => {
    if (item.type === 'file' && item.path) {
      try {
        const response = await fetch(item.path)
        const text = await response.text()
        
        // Create a blob and download
        const blob = new Blob([text], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = item.title
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Failed to download file:', error)
      }
    }
  }

  // Navigate to a specific level in the breadcrumb
  const navigateToBreadcrumb = (index) => {
    if (index === -1) {
      setCurrentPath([])
    } else {
      setCurrentPath(currentPath.slice(0, index + 1))
    }
    setSelectedItem(null)
  }

  // Go back one level
  const goBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1))
      setSelectedItem(null)
    }
  }

  // Get breadcrumb trail
  const getBreadcrumbs = () => {
    const breadcrumbs = [{ id: 'root', title: 'Resume' }]
    let current = null

    for (const pathId of currentPath) {
      if (!current) {
        current = terminal.find(item => item.id === pathId)
      } else {
        current = current.children?.find(item => item.id === pathId)
      }
      if (current) {
        breadcrumbs.push({ id: pathId, title: current.title })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="h-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
        <button
          onClick={goBack}
          disabled={currentPath.length === 0}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Back"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />

        <button
          onClick={() => navigateToBreadcrumb(-1)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          title="Home"
        >
          <FaHome className="w-4 h-4" />
        </button>
      </div>

      {/* Address Bar (Breadcrumb) */}
      <div className="h-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        <div className="flex items-center gap-1 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.id} className="flex items-center gap-1">
              <button
                onClick={() => navigateToBreadcrumb(index - 1)}
                className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {crumb.title}
              </button>
              {index < breadcrumbs.length - 1 && (
                <FaChevronRight className="w-3 h-3 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* File/Folder List */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            <FaFolder className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>This folder is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                onDoubleClick={() => handleItemDoubleClick(item)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded cursor-pointer
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  ${selectedItem === item.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                `}
              >
                {item.type === 'folder' ? (
                  <FaFolderOpen className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FaFile className="w-5 h-5 text-blue-500" />
                )}
                <span className="flex-1 text-sm text-gray-900 dark:text-gray-100">
                  {item.title}
                </span>
                {item.type === 'file' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleItemDoubleClick(item)
                    }}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                    title="Download"
                  >
                    <FaDownload className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center px-4 text-xs text-gray-600 dark:text-gray-400">
        <span>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
        {selectedItem && (
          <span className="ml-4">
            {items.find(i => i.id === selectedItem)?.title}
          </span>
        )}
      </div>
    </div>
  )
}
