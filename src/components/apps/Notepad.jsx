import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import notepadData from '@/config/notepad'

export default function Notepad() {
  const [currentFile, setCurrentFile] = useState('about-me')
  const [noteContent, setNoteContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showFileMenu, setShowFileMenu] = useState(false)
  const [fontSize, setFontSize] = useState(14)
  const [wordWrap, setWordWrap] = useState(true)

  // Flatten all notes from all sections
  const allNotes = notepadData.flatMap(section => 
    section.notes.map(note => ({
      ...note,
      section: section.title
    }))
  )

  useEffect(() => {
    const note = allNotes.find(n => n.id === currentFile)
    if (note) {
      loadNote(note.file)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFile])

  const loadNote = async (file) => {
    setLoading(true)
    try {
      const response = await fetch(file)
      const text = await response.text()
      setNoteContent(text)
    } catch (error) {
      setNoteContent(`# Error Loading Content\n\nCould not load: ${file}`)
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
            onClick={() => setShowFileMenu(!showFileMenu)}
            onBlur={() => setTimeout(() => setShowFileMenu(false), 200)}
            className="px-3 py-1.5 hover:bg-gray-100 rounded transition-colors text-gray-700"
          >
            File
          </button>
          {showFileMenu && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              <div className="py-1">
                <div className="px-3 py-1.5 text-xs text-gray-500 font-semibold">Open Document</div>
                {allNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => {
                      setCurrentFile(note.id)
                      setShowFileMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2 ${
                      currentFile === note.id ? 'bg-gray-50' : ''
                    }`}
                  >
                    <span className="text-base">{note.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-900">{note.title}</div>
                      <div className="text-xs text-gray-500">{note.section}</div>
                    </div>
                  </button>
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
      <div className="h-7 bg-gray-50 border-t border-gray-200 flex items-center justify-between px-4 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>Document: {currentNote?.title || 'Untitled'}</span>
          <span>|</span>
          <span>Section: {currentNote?.section || 'General'}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Zoom: {Math.round((fontSize / 14) * 100)}%</span>
          <span>|</span>
          <span>Word Wrap: {wordWrap ? 'On' : 'Off'}</span>
        </div>
      </div>
    </div>
  )
}
