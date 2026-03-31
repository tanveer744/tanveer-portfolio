import { useState } from 'react'
import ActivityBar from './components/ActivityBar'
import Sidebar from './components/Sidebar/Sidebar'
import Editor from './components/Editor/Editor'
import Terminal from './components/Terminal/Terminal'
import StatusBar from './components/StatusBar'
import { useVSCodeState } from './hooks/useVSCodeState'

export default function VSCode({ windowData }) {
  const {
    // State
    activeProject,
    openFiles,
    activeFile,
    sidebarPanel,
    terminalVisible,
    sidebarWidth,
    terminalHeight,
    // Actions
    switchProject,
    openFile,
    closeFile,
    switchFile,
    setSidebarPanel,
    toggleTerminal,
    setSidebarWidth,
    setTerminalHeight
  } = useVSCodeState()

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] text-[#cccccc] font-mono">
      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Activity Bar */}
        <ActivityBar 
          activePanel={sidebarPanel}
          onPanelChange={setSidebarPanel}
        />
        
        {/* Sidebar */}
        {sidebarPanel && (
          <Sidebar
            panel={sidebarPanel}
            width={sidebarWidth}
            onWidthChange={setSidebarWidth}
            activeProject={activeProject}
            onProjectChange={switchProject}
            onFileOpen={openFile}
          />
        )}
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Editor
            openFiles={openFiles}
            activeFile={activeFile}
            onFileSwitch={switchFile}
            onFileClose={closeFile}
          />
          
          {/* Terminal Panel */}
          {terminalVisible && (
            <Terminal
              height={terminalHeight}
              onHeightChange={setTerminalHeight}
              onClose={() => toggleTerminal()}
            />
          )}
        </div>
      </div>
      
      {/* Status Bar */}
      <StatusBar
        activeFile={activeFile}
        activeProject={activeProject}
        terminalVisible={terminalVisible}
        onTerminalToggle={toggleTerminal}
      />
    </div>
  )
}