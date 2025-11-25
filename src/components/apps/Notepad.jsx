import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { FaUser, FaFolder, FaGithub, FaGlobe, FaRobot, FaBrain, FaCarCrash } from 'react-icons/fa'
import notepadData from '@/config/notepad'

// Add keyframes and tooltip styles
const style = document.createElement('style')
style.textContent = `
  @keyframes dropdownFadeIn {
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: blur(0);
    }
  }
  
  [data-tooltip] {
    position: relative;
  }
  
  [data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 8px;
    padding: 4px 8px;
    background: #1f2937;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, margin-left 0.2s;
  }
  
  [data-tooltip]:hover::after {
    opacity: 1;
    margin-left: 12px;
  }
`
document.head.appendChild(style)

export default function Notepad({ windowData }) {
  const [currentFile, setCurrentFile] = useState('about-me')
  const [noteContent, setNoteContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showFileMenu, setShowFileMenu] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [wordWrap, setWordWrap] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Function to get appropriate icon based on note ID
  const getNoteIcon = (noteId) => {
    const iconMap = {
      'about-me': <FaUser className="text-blue-500" />,
      'github-stats': <FaGithub className="text-gray-700" />,
      'about-site': <FaGlobe className="text-green-500" />,
      'linkedin-automator': <FaRobot className="text-purple-500" />,
      'query-document': <FaBrain className="text-yellow-500" />,
      'road-rage': <FaCarCrash className="text-red-500" />
    }
    return iconMap[noteId] || <FaFolder className="text-gray-400" />
  }

  // Keep track of all notes for other functionality
  const allNotes = notepadData.flatMap(section => 
    section.notes.map(note => ({
      ...note,
      section: section.title,
      icon: getNoteIcon(note.id)
    }))
  )

  // Set initial file from window data if provided
  useEffect(() => {
    if (windowData?.data?.initialFile) {
      setCurrentFile(windowData.data.initialFile)
    }
  }, [windowData?.data?.initialFile])

  useEffect(() => {
    const note = allNotes.find(n => n.id === currentFile)
    if (note) {
      loadNote(note.file)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFile])

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + F to toggle File menu
      if (e.altKey && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        setShowFileMenu(prev => !prev)
        setSelectedIndex(0)
      }
      
      // Esc to close menu
      if (e.key === 'Escape' && showFileMenu) {
        e.preventDefault()
        setShowFileMenu(false)
      }
      
      // Arrow navigation and Enter when menu is open
      if (showFileMenu) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, allNotes.length - 1))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          const selectedNote = allNotes[selectedIndex]
          if (selectedNote) {
            setCurrentFile(selectedNote.id)
            setShowFileMenu(false)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showFileMenu, selectedIndex, allNotes])

  const loadNote = async (file) => {
    setLoading(true)
    try {
      // Ensure the path starts with a slash and is relative to the public directory
      const filePath = file.startsWith('/') ? file : `/${file}`
      const response = await fetch(filePath)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const text = await response.text()
      
      // If the response is empty, throw an error
      if (!text || text.trim() === '') {
        throw new Error('Empty content received')
      }
      
      setNoteContent(text)
    } catch (error) {
      console.error('Error loading note:', error)
      setNoteContent(`# Error Loading Content\n\n**File:** ${file}\n\n**Error:** ${error.message || 'Unknown error occurred'}\n\nPlease check the console for more details.`)
    } finally {
      setLoading(false)
    }
  }

  const currentNote = allNotes.find(n => n.id === currentFile)

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Menu Bar */}
      <div className="h-10 bg-white border-b border-gray-200 flex items-center px-2 text-xs select-none">
        {/* File Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFileMenu(!showFileMenu)
              setSelectedIndex(0)
            }}
            onBlur={() => setTimeout(() => setShowFileMenu(false), 200)}
            className="px-3 py-1.5 hover:bg-gray-100 rounded transition-colors text-gray-700 relative group"
            title="Alt + F"
          >
            <span className="underline decoration-dotted decoration-gray-400">F</span>ile
            {/* Animated underline on hover */}
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 ease-out group-hover:w-3/4 group-hover:left-[12.5%]"></span>
          </button>
          {showFileMenu && (
            <div 
              className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 transition-all duration-200 ease-out"
              style={{
                opacity: 0,
                transform: 'scale(0.97) translateY(-5px)',
                filter: 'blur(3px)',
                animation: 'dropdownFadeIn 200ms ease-out forwards'
              }}
            >
              <div className="py-1">
                <div className="px-3 py-1.5 text-xs text-gray-500 font-semibold">Open Document</div>
                {notepadData.map((section) => (
                  <div key={section.id}>
                    <div className="px-3 py-1.5 mt-2 text-xs font-medium text-gray-500 flex items-center gap-2 border-b border-gray-100">
                      {section.id === 'profile' ? (
                        <FaUser className="text-blue-500" />
                      ) : (
                        <FaFolder className="text-yellow-500" />
                      )}
                      <span>{section.title}</span>
                    </div>
                    {section.notes.map((note) => {
                      const noteIndex = allNotes.findIndex(n => n.id === note.id)
                      const isSelected = noteIndex === selectedIndex
                      return (
                      <button
                        key={note.id}
                        onClick={() => {
                          setCurrentFile(note.id);
                          setShowFileMenu(false);
                        }}
                        onMouseEnter={() => setSelectedIndex(noteIndex)}
                        className={`w-full text-left px-4 py-2 transition-all duration-200 flex items-center gap-2 relative overflow-hidden cursor-pointer
                          ${
                            currentFile === note.id
                              ? 'bg-blue-50/50'
                              : isSelected
                              ? 'bg-blue-50/70'
                              : 'hover:bg-gray-50'
                          }`}
                        title={note.excerpt || `Open ${note.title}`}
                        data-tooltip={note.excerpt || `Open ${note.title}`}
                      >
                        {/* Blue indicator */}
                        {currentFile === note.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full"></div>
                        )}
                        <span
                          className={`text-base transition-all duration-200 ${
                            currentFile === note.id 
                              ? 'scale-110' 
                              : isSelected || 'group-hover:translate-x-0.5'
                          }`}
                        >
                          {getNoteIcon(note.id)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-xs ${
                              currentFile === note.id
                                ? 'font-bold text-gray-900'
                                : 'font-medium text-gray-900'
                            }`}
                          >
                            {note.title}
                          </div>
                        </div>
                      </button>
                    )})}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Menu */}
        <button className="px-3 py-1.5 hover:bg-gray-100 rounded transition-colors text-gray-700">
          Edit
        </button>
        
        <button className="px-3 py-1.5 hover:bg-gray-100 rounded transition-colors text-gray-700">
          View
        </button>

        <div className="flex-1" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 mr-2">
          <button
            onClick={() => setFontSize(Math.max(10, fontSize - 2))}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-gray-700"
            title="Zoom out"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="text-xs text-gray-600 w-10 text-center">{Math.round((fontSize / 14) * 100)}%</span>
          <button
            onClick={() => setFontSize(Math.min(32, fontSize + 2))}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-gray-700"
            title="Zoom in"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Word Wrap Toggle */}
        <button
          onClick={() => setWordWrap(!wordWrap)}
          className={`px-3 py-1.5 rounded transition-colors text-xs ${
            wordWrap ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
          }`}
          title="Word wrap"
        >
          Wrap
        </button>
      </div>

      {/* Document Info Bar */}
      {currentNote && (
        <div className="h-9 bg-blue-50 border-b border-blue-100 flex items-center px-4 gap-3">
          <span className="text-lg">{currentNote.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">{currentNote.title}</div>
          </div>
          {currentNote.link && (
            <a
              href={currentNote.link}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-win-accent hover:text-win-accent-hover flex items-center gap-1.5 hover:underline"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>View Source</span>
            </a>
          )}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-win-accent rounded-full animate-spin" />
              <div className="text-sm text-gray-500">Loading document...</div>
            </div>
          </div>
        ) : (
          <div 
            className={`px-8 py-6 ${wordWrap ? '' : 'overflow-x-auto'}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            <div className={`prose prose-sm max-w-none ${wordWrap ? '' : 'whitespace-pre-wrap'}`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  // Custom link styling
                  a: ({ ...props }) => (
                    <a
                      {...props}
                      className="text-win-accent hover:text-win-accent-hover no-underline hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    />
                  ),
                  // Custom heading styling
                  h1: ({ ...props }) => (
                    <h1 {...props} className="text-3xl font-bold mb-4 mt-6 text-gray-900" />
                  ),
                  h2: ({ ...props }) => (
                    <h2 {...props} className="text-2xl font-bold mb-3 mt-5 text-gray-900" />
                  ),
                  h3: ({ ...props }) => (
                    <h3 {...props} className="text-xl font-bold mb-2 mt-4 text-gray-900" />
                  ),
                  // Custom paragraph styling
                  p: ({ ...props }) => (
                    <p {...props} className="mb-4 text-gray-700 leading-relaxed" />
                  ),
                  // Custom list styling
                  ul: ({ ...props }) => (
                    <ul {...props} className="mb-4 ml-6 list-disc text-gray-700" />
                  ),
                  ol: ({ ...props }) => (
                    <ol {...props} className="mb-4 ml-6 list-decimal text-gray-700" />
                  ),
                  li: ({ ...props }) => (
                    <li {...props} className="mb-2" />
                  ),
                  // Custom code block styling
                  code: ({ inline, ...props }) =>
                    inline ? (
                      <code
                        {...props}
                        className="px-1.5 py-0.5 bg-gray-100 text-gray-800 rounded text-sm font-mono"
                      />
                    ) : (
                      <code 
                        {...props} 
                        className="block p-4 bg-gray-100 text-gray-800 rounded-lg overflow-x-auto text-sm font-mono my-4" 
                      />
                    ),
                  // Custom blockquote styling
                  blockquote: ({ ...props }) => (
                    <blockquote 
                      {...props} 
                      className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600"
                    />
                  ),
                  // Custom table styling
                  table: ({ ...props }) => (
                    <div className="overflow-x-auto my-4">
                      <table {...props} className="min-w-full divide-y divide-gray-200" />
                    </div>
                  ),
                  thead: ({ ...props }) => (
                    <thead {...props} className="bg-gray-50" />
                  ),
                  tbody: ({ ...props }) => (
                    <tbody {...props} className="bg-white divide-y divide-gray-200" />
                  ),
                  th: ({ ...props }) => (
                    <th {...props} className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider" />
                  ),
                  td: ({ ...props }) => (
                    <td {...props} className="px-4 py-3 text-sm text-gray-700" />
                  ),
                  // Custom image styling
                  img: ({ ...props }) => (
                    <img {...props} className="max-w-full h-auto rounded-lg my-4" alt={props.alt || ''} />
                  ),
                  // Custom hr styling
                  hr: ({ ...props }) => (
                    <hr {...props} className="my-6 border-gray-200" />
                  ),
                }}
              >
                {noteContent}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-7 bg-gray-50 border-t border-gray-200 flex items-center justify-between px-4 select-none" style={{ fontSize: '12px', color: '#6b7280' }}>
        <div className="flex items-center gap-3">
          <span className="opacity-70">Press <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Alt + F</kbd> to open File menu</span>
          <span className="opacity-50">•</span>
          <span className="opacity-70"><kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Esc</kbd> to close</span>
          <span className="opacity-50">•</span>
          <span className="opacity-70"><kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">↑</kbd>/<kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">↓</kbd> to navigate</span>
          <span className="opacity-50">•</span>
          <span className="opacity-70"><kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Enter</kbd> to open</span>
        </div>
        <div className="flex items-center gap-3 opacity-70">
          <span>Zoom: {Math.round((fontSize / 14) * 100)}%</span>
          <span className="opacity-50">|</span>
          <span>{currentNote?.title || 'Untitled'}</span>
        </div>
      </div>
    </div>
  )
}
