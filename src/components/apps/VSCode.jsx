import { useState } from 'react'
import { 
  FiFolder, 
  FiSearch, 
  FiGitBranch, 
  FiPlay, 
  FiPackage,
  FiSettings 
} from 'react-icons/fi'

// VS Code project data structure  
const projects = {
  'linkedin-automator': {
    name: 'LinkedIn Automator',
    files: [
      { name: 'README.md', type: 'file', content: `# 🤖 LinkedIn Automator\n\nAI-powered LinkedIn automation assistant built with Python and Tkinter.\n\n## ✨ Features\n- Smart delay algorithms to mimic human behavior\n- Chrome session management for seamless automation\n- Modern Tkinter GUI for easy control\n- Automated connection requests and messaging\n- Profile viewing and engagement automation\n- Account safety features and rate limiting\n\n## 🛠️ Tech Stack\n- **Python 3.8+** - Core automation logic\n- **Tkinter** - Modern GUI interface\n- **Selenium** - Browser automation\n- **Chrome WebDriver** - Session management\n- **AI/ML** - Behavior pattern analysis` },
      { name: 'main.py', type: 'file', content: `#!/usr/bin/env python3\n"""\nLinkedIn Automator - Main Application Entry Point\nAI-powered LinkedIn automation with human-like behavior patterns\n"""\n\nimport tkinter as tk\nfrom tkinter import ttk, messagebox\nimport threading\nimport time\nfrom selenium import webdriver\n\nclass LinkedInAutomator:\n    def __init__(self):\n        self.driver = None\n        self.is_running = False\n        self.setup_gui()\n        \n    def setup_gui(self):\n        """Initialize the modern Tkinter GUI"""\n        self.root = tk.Tk()\n        self.root.title("LinkedIn Automator v2.0")\n        self.root.geometry("800x600")\n        self.root.configure(bg='#2d2d30')` },
      { name: 'requirements.txt', type: 'file', content: `selenium==4.15.2\nwebdriver-manager==4.0.1\nbeautifulsoup4==4.12.2\nrequests==2.31.0\npandas==2.0.3\npython-dotenv==1.0.0` }
    ]
  },
  'hackrx-query': {
    name: 'HackRx Query System',
    files: [
      { name: 'README.md', type: 'file', content: `# 🔍 HackRx Query System\n\nIntelligent document processing & policy Q&A platform using FAISS and Gemini AI.\n\n## 🚀 Features\n- Advanced document indexing with FAISS\n- Natural language query processing\n- Real-time policy Q&A responses\n- Semantic search capabilities\n- FastAPI backend architecture` },
      { name: 'app.py', type: 'file', content: `from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\nimport faiss\nimport numpy as np\nfrom sentence_transformers import SentenceTransformer\n\napp = FastAPI(title="HackRx Query System")\nmodel = SentenceTransformer('all-MiniLM-L6-v2')\n\nclass QueryRequest(BaseModel):\n    query: str\n    top_k: int = 5\n\n@app.post("/query")\nasync def process_query(request: QueryRequest):\n    # Embed query and search\n    query_embedding = model.encode([request.query])\n    # Search logic here\n    return {"results": []}` }
    ]
  }
}

// State management hook
export const useVSCodeState = () => {
  const [activeProject, setActiveProject] = useState('linkedin-automator')
  const [openFiles, setOpenFiles] = useState(['README.md'])
  const [activeFile, setActiveFile] = useState('README.md')
  const [sidebarPanel, setSidebarPanel] = useState('explorer')
  const [terminalVisible, setTerminalVisible] = useState(false)

  const openFile = (fileName) => {
    if (!openFiles.includes(fileName)) {
      setOpenFiles(prev => [...prev, fileName])
    }
    setActiveFile(fileName)
  }

  const closeFile = (fileName) => {
    const newFiles = openFiles.filter(f => f !== fileName)
    setOpenFiles(newFiles)
    if (fileName === activeFile && newFiles.length > 0) {
      setActiveFile(newFiles[0])
    }
  }

  return {
    activeProject, openFiles, activeFile, sidebarPanel, terminalVisible,
    projects, openFile, closeFile, setActiveFile, setSidebarPanel,
    setTerminalVisible: () => setTerminalVisible(!terminalVisible)
  }
}

// Activity Bar Component
export function ActivityBar({ activePanel, onPanelChange }) {
  const items = [
    { id: 'explorer', icon: FiFolder, label: 'Explorer' },
    { id: 'search', icon: FiSearch, label: 'Search' },
    { id: 'source-control', icon: FiGitBranch, label: 'Source Control' },
    { id: 'extensions', icon: FiPackage, label: 'Extensions' },
  ]

  return (
    <div className="w-12 bg-[#333333] border-r border-[#2d2d30] flex flex-col items-center py-2">
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activePanel === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onPanelChange(isActive ? null : item.id)}
              className={`
                w-12 h-12 flex items-center justify-center rounded
                transition-colors duration-150 group relative
                ${isActive 
                  ? 'bg-[#094771] text-white' 
                  : 'text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white'
                }
              `}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-r" />
              )}
            </button>
          )
        })}
      </div>
      
      <div className="mt-auto">
        <button className="w-12 h-12 flex items-center justify-center rounded text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white transition-colors duration-150">
          <FiSettings className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

// File Explorer Component
export function FileExplorer({ project, onFileOpen }) {
  return (
    <div className="p-2">
      <div className="text-xs text-[#969696] uppercase tracking-wide mb-2 px-2">
        {project.name}
      </div>
      <div className="space-y-1">
        {project.files.map((file) => (
          <button
            key={file.name}
            onClick={() => onFileOpen(file.name)}
            className="w-full flex items-center gap-2 px-2 py-1 text-sm text-[#cccccc] hover:bg-[#2a2d2e] rounded transition-colors duration-150"
          >
            <span>{file.type === 'file' ? '📄' : '📁'}</span>
            <span>{file.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Editor Tabs Component  
export function EditorTabs({ openFiles, activeFile, onFileSwitch, onFileClose }) {
  if (openFiles.length === 0) return null

  return (
    <div className="flex bg-[#252526] border-b border-[#2d2d30] overflow-x-auto">
      {openFiles.map((fileName) => {
        const isActive = fileName === activeFile
        
        return (
          <div
            key={fileName}
            className={`
              flex items-center gap-2 px-3 py-2 text-sm border-r border-[#2d2d30] cursor-pointer
              transition-colors duration-150 group min-w-0 max-w-48
              ${isActive 
                ? 'bg-[#1e1e1e] text-[#ffffff]' 
                : 'bg-[#2d2d30] text-[#969696] hover:bg-[#1e1e1e] hover:text-[#cccccc]'
              }
            `}
            onClick={() => onFileSwitch(fileName)}
          >
            <span className="truncate">{fileName}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onFileClose(fileName)
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-[#525253] rounded p-0.5 transition-all duration-150"
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}

// Code Editor Component
export function CodeEditor({ content, fileName }) {
  const lines = content ? content.split('\n') : ['# Welcome to VS Code Portfolio']
  
  return (
    <div className="flex-1 bg-[#1e1e1e] overflow-auto font-mono text-sm">
      <div className="flex">
        {/* Line Numbers */}
        <div className="bg-[#1e1e1e] text-[#858585] text-right px-2 py-4 select-none border-r border-[#2d2d30]">
          {lines.map((_, index) => (
            <div key={index} className="leading-6 h-6">
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Code Content */}
        <div className="flex-1 p-4 text-[#d4d4d4] whitespace-pre-wrap">
          {lines.map((line, index) => (
            <div key={index} className="leading-6 h-6">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Status Bar Component
export function StatusBar({ activeFile, terminalVisible, onTerminalToggle }) {
  return (
    <div className="h-6 bg-[#007acc] text-white text-xs flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <span>🌿 main</span>
        <span>↕ 0 ↔ 0</span>
        {activeFile && <span>📄 {activeFile}</span>}
      </div>
      
      <div className="flex items-center gap-4">
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <button 
          onClick={onTerminalToggle}
          className="hover:bg-[#005a9e] px-1 rounded transition-colors duration-150"
        >
          {terminalVisible ? '🔼' : '🔽'} Terminal
        </button>
      </div>
    </div>
  )
}

// Main VS Code Component
export default function VSCode({ windowData }) {
  const {
    activeProject, openFiles, activeFile, sidebarPanel, terminalVisible,
    projects, openFile, closeFile, setActiveFile, setSidebarPanel,
    setTerminalVisible
  } = useVSCodeState()

  const currentProject = projects[activeProject]
  const currentFile = currentProject?.files.find(f => f.name === activeFile)

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-[#cccccc]">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Activity Bar */}
        <ActivityBar 
          activePanel={sidebarPanel}
          onPanelChange={setSidebarPanel}
        />
        
        {/* Sidebar */}
        {sidebarPanel && (
          <div className="w-80 bg-[#252526] border-r border-[#2d2d30]">
            {sidebarPanel === 'explorer' && (
              <FileExplorer
                project={currentProject}
                onFileOpen={openFile}
              />
            )}
            {sidebarPanel === 'search' && (
              <div className="p-4 text-[#969696]">
                <div className="text-sm">Search functionality coming soon...</div>
              </div>
            )}
          </div>
        )}
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <EditorTabs
            openFiles={openFiles}
            activeFile={activeFile}
            onFileSwitch={setActiveFile}
            onFileClose={closeFile}
          />
          
          <CodeEditor
            content={currentFile?.content}
            fileName={activeFile}
          />
          
          {/* Terminal Panel */}
          {terminalVisible && (
            <div className="h-48 bg-[#1e1e1e] border-t border-[#2d2d30] p-4">
              <div className="text-[#d4d4d4] font-mono text-sm">
                <div className="text-[#569cd6]">PS C:\portfolio\{activeProject}&gt;</div>
                <div className="text-[#6a9955]"># Portfolio Terminal - Try: npm start, git status, python main.py</div>
                <div className="flex items-center">
                  <span className="text-[#569cd6]">PS C:\portfolio\{activeProject}&gt;</span>
                  <span className="ml-2 animate-pulse">|</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Status Bar */}
      <StatusBar
        activeFile={activeFile}
        terminalVisible={terminalVisible}
        onTerminalToggle={setTerminalVisible}
      />
    </div>
  )
}