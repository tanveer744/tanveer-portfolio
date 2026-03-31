import { Component } from 'react'
import terminal from '@/config/terminal'
import { useStore } from '@/stores'
import notepadData from '@/config/notepad'

// Wrapper component to provide store to Terminal class
export function TerminalWrapper(props) {
  const store = useStore()
  return <Terminal {...props} store={store} />
}

class Terminal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      history: [],
      curHistory: 0,
      curInputTimes: 0,
      curDirPath: [],
      curChildren: terminal,
      activeTab: 0,
      tabs: [{ id: 0, title: 'PowerShell' }]
    }
    
    this.commands = {
      cd: this.cd,
      ls: this.ls,
      cat: this.cat,
      open: this.cat, // Alias for cat
      clear: this.clear,
      help: this.help,
      pwd: this.pwd,
      echo: this.echo,
      whoami: this.whoami,
      neofetch: this.neofetch,
      date: this.date,
      hostname: this.hostname,
      contact: this.contact,
      resume: this.resume,
      projects: this.projects,
      skills: this.skills
    }
  }

  componentDidMount() {
    this.reset()
    this.generateInputRow(this.state.curInputTimes)
  }

  componentWillUnmount() {
    // Clean up any event listeners if needed
  }

  reset = () => {
    const terminalContent = document.querySelector('#terminal-content')
    if (terminalContent) {
      terminalContent.innerHTML = ''
    }
  }

  addRow = (row) => {
    if (this.state.content.find((item) => item.key === row.key)) return
    
    this.setState(prevState => ({
      content: [...prevState.content, row]
    }))
  }

  getCurDirName = () => {
    if (this.state.curDirPath.length === 0) return '~'
    return this.state.curDirPath[this.state.curDirPath.length - 1]
  }

  getCurChildren = (path = this.state.curDirPath) => {
    let children = terminal
    for (const name of path) {
      const folder = children.find((item) => {
        return item.title === name && item.type === 'folder'
      })
      if (folder) {
        children = folder.children
      }
    }
    return children
  }

  // Change directory
  cd = (args) => {
    if (args === undefined || args === '~') {
      // Move to root
      this.setState({
        curDirPath: [],
        curChildren: terminal
      })
    } else if (args === '.') {
      // Stay in current folder
      return
    } else if (args === '..') {
      // Move to parent folder
      if (this.state.curDirPath.length === 0) return
      
      const newPath = [...this.state.curDirPath]
      newPath.pop()
      
      this.setState({
        curDirPath: newPath,
        curChildren: this.getCurChildren(newPath)
      })
    } else {
      // Move to child folder
      const target = this.state.curChildren.find((item) => {
        return item.title === args && item.type === 'folder'
      })
      
      if (target === undefined) {
        this.generateResultRow(
          this.state.curInputTimes,
          <span className="text-red-400">{`cd: no such file or directory: ${args}`}</span>
        )
      } else {
        this.setState({
          curChildren: target.children,
          curDirPath: [...this.state.curDirPath, target.title]
        })
      }
    }
  }

  // List directory contents
  ls = () => {
    const result = []
    for (const item of this.state.curChildren) {
      result.push(
        <span
          key={`terminal-result-ls-${this.state.curInputTimes}-${item.id}`}
          className={`${item.type === 'file' ? 'text-gray-100' : 'text-yellow-300'}`}
        >
          {item.title}
        </span>
      )
    }
    this.generateResultRow(
      this.state.curInputTimes,
      <div className="grid grid-cols-3 gap-2 w-full">{result}</div>
    )
  }

  // Display file content
  cat = async (args) => {
    const file = this.state.curChildren.find((item) => {
      return item.title === args && item.type === 'file'
    })

    if (file === undefined) {
      this.generateResultRow(
        this.state.curInputTimes,
        <span className="text-red-400">{`cat: ${args}: No such file or directory`}</span>
      )
    } else {
      // Check if this is a project file - strip .txt extension
      const fileName = args.endsWith('.txt') ? args.slice(0, -4) : args
      
      // Map terminal file names to notepad project IDs
      const projectMapping = {
        'road_rage_detection': 'road-rage',
        'linkedin_automation_tool': 'linkedin-automator',
        'hackrx_query_system': 'query-document'
      }
      
      const projectId = projectMapping[fileName]
      
      // If it's a project file, open in Notepad instead
      if (projectId && this.props.store) {
        const notepadNote = notepadData
          .flatMap(section => section.notes)
          .find(note => note.id === projectId)
        
        if (notepadNote) {
          // Open the file in Notepad app
          this.props.store.addWindow({
            appId: 'notepad',
            title: `Notepad - ${notepadNote.title}`,
            icon: '📝',
            x: 200,
            y: 100,
            width: 900,
            height: 700,
            minWidth: 400,
            minHeight: 300,
            data: {
              initialFile: projectId
            }
          })
          
          this.generateResultRow(
            this.state.curInputTimes,
            <span className="text-green-400">✓ Opening {notepadNote.title} in Notepad...</span>
          )
          return
        }
      }
      
      // Show loading message
      this.generateResultRow(
        this.state.curInputTimes,
        <span className="text-yellow-400">Loading...</span>
      )

      try {
        // Fetch file content from path if available, otherwise use inline content
        let content = file.content
        if (file.path) {
          const response = await fetch(file.path)
          if (response.ok) {
            content = await response.text()
          } else {
            content = 'Error: Unable to load file content'
          }
        }

        // Remove the loading message and show actual content
        this.setState(prevState => ({
          content: prevState.content.slice(0, -1)
        }), () => {
          this.generateResultRow(
            this.state.curInputTimes,
            <div className="whitespace-pre-wrap text-gray-100">{content}</div>
          )
        })
      } catch (error) {
        // Remove loading message and show error
        this.setState(prevState => ({
          content: prevState.content.slice(0, -1)
        }), () => {
          this.generateResultRow(
            this.state.curInputTimes,
            <span className="text-red-400">Error loading file: {error.message}</span>
          )
        })
      }
    }
  }

  // Clear terminal
  clear = () => {
    this.setState({
      curInputTimes: this.state.curInputTimes + 1,
      content: []
    }, () => {
      this.reset()
    })
  }

  // Print working directory
  pwd = () => {
    const path = this.state.curDirPath.length === 0 
      ? '/home/tanveer' 
      : `/home/tanveer/${this.state.curDirPath.join('/')}`
    this.generateResultRow(
      this.state.curInputTimes,
      <span className="text-gray-100">{path}</span>
    )
  }

  // Echo text
  echo = (args) => {
    // Handle full command text after "echo "
    const inputElement = document.querySelector(`#terminal-input-${this.state.curInputTimes}`)
    const fullText = inputElement?.value || ''
    const echoText = fullText.replace(/^echo\s*/, '')
    this.generateResultRow(
      this.state.curInputTimes,
      <span className="text-gray-100">{echoText || ''}</span>
    )
  }

  // Show current user
  whoami = () => {
    this.generateResultRow(
      this.state.curInputTimes,
      <span className="text-gray-100">tanveer</span>
    )
  }

  // Get current date
  date = () => {
    const now = new Date()
    const dateStr = now.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    })
    this.generateResultRow(
      this.state.curInputTimes,
      <span className="text-gray-100">{dateStr}</span>
    )
  }

  // Get hostname
  hostname = () => {
    this.generateResultRow(
      this.state.curInputTimes,
      <span className="text-gray-100">tanveer-portfolio</span>
    )
  }

  // Neofetch - Fun system info display
  neofetch = () => {
    const neofetchArt = (
      <div className="font-mono text-sm">
        <div className="flex gap-6">
          {/* ASCII Art Logo */}
          <pre className="text-cyan-400 leading-tight">
{`    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀
    ⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀
    ⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⣿⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`}
          </pre>
          
          {/* System Info */}
          <div className="space-y-1">
            <div>
              <span className="text-cyan-400 font-bold">tanveer</span>
              <span className="text-gray-500">@</span>
              <span className="text-cyan-400 font-bold">portfolio</span>
            </div>
            <div className="text-gray-500">──────────────────</div>
            <div>
              <span className="text-cyan-400 font-bold">OS:</span>
              <span className="text-gray-100 ml-2">Windows 11 Portfolio Edition</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Host:</span>
              <span className="text-gray-100 ml-2">React 18.2 + Vite</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Kernel:</span>
              <span className="text-gray-100 ml-2">Tailwind CSS 3.4</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Shell:</span>
              <span className="text-gray-100 ml-2">Portfolio Terminal v1.0</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">DE:</span>
              <span className="text-gray-100 ml-2">Windows 11 Desktop</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Theme:</span>
              <span className="text-gray-100 ml-2">Dark Mode / Fluent Design</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Icons:</span>
              <span className="text-gray-100 ml-2">React Icons + Custom</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Terminal:</span>
              <span className="text-gray-100 ml-2">Windows Terminal Style</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">CPU:</span>
              <span className="text-gray-100 ml-2">JavaScript V8 Engine</span>
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Memory:</span>
              <span className="text-gray-100 ml-2">Zustand State Management</span>
            </div>
            <div className="flex gap-1 mt-3">
              <span className="w-4 h-4 rounded-sm bg-gray-900"></span>
              <span className="w-4 h-4 rounded-sm bg-red-500"></span>
              <span className="w-4 h-4 rounded-sm bg-green-500"></span>
              <span className="w-4 h-4 rounded-sm bg-yellow-500"></span>
              <span className="w-4 h-4 rounded-sm bg-blue-500"></span>
              <span className="w-4 h-4 rounded-sm bg-purple-500"></span>
              <span className="w-4 h-4 rounded-sm bg-cyan-500"></span>
              <span className="w-4 h-4 rounded-sm bg-white"></span>
            </div>
          </div>
        </div>
      </div>
    )
    this.generateResultRow(this.state.curInputTimes, neofetchArt)
  }

  // Show help
  help = () => {
    const help = (
      <div className="text-gray-100 space-y-1">
        <div className="text-green-400 font-bold mb-2">Available Commands:</div>
        <div className="ml-4 space-y-1">
          <div><span className="text-cyan-400">cat &lt;file&gt;</span> - Display the content of a file</div>
          <div><span className="text-cyan-400">open &lt;file&gt;</span> - Display the content of a file (alias for cat)</div>
          <div><span className="text-cyan-400">cd &lt;dir&gt;</span> - Change directory (cd .. for parent, cd ~ for root)</div>
          <div><span className="text-cyan-400">ls</span> - List files and folders in current directory</div>
          <div><span className="text-cyan-400">pwd</span> - Print current working directory</div>
          <div><span className="text-cyan-400">echo &lt;text&gt;</span> - Print text to terminal</div>
          <div><span className="text-cyan-400">whoami</span> - Show current user</div>
          <div><span className="text-cyan-400">hostname</span> - Show system hostname</div>
          <div><span className="text-cyan-400">date</span> - Show current date and time</div>
          <div><span className="text-cyan-400">neofetch</span> - Display system info with ASCII art</div>
          <div><span className="text-cyan-400">clear</span> - Clear the terminal screen</div>
          <div><span className="text-cyan-400">help</span> - Display this help menu</div>
          
          <div className="mt-3 text-yellow-400 font-semibold">🌟 Portfolio Commands:</div>
          <div><span className="text-green-400">contact</span> - Show contact information (email, LinkedIn, GitHub)</div>
          <div><span className="text-green-400">resume</span> - Download resume PDF</div>
          <div><span className="text-green-400">projects</span> - List all projects with details</div>
          <div><span className="text-green-400">skills</span> - Display technical skills tree</div>
        </div>
        <div className="text-yellow-300 mt-3">
          💡 Tips: Use ↑/↓ arrow keys for command history, Tab for auto-complete
        </div>
        <div className="text-cyan-400 mt-3">
          📁 Available folders: about, projects, experience, education, skills, certifications, achievements, interests
        </div>
        <div className="text-blue-300 mt-3">
          🚀 Projects: Access projects from the projects folder:
        </div>
        <div className="text-gray-300 ml-4 mt-1">
          <div>cat road_rage_detection - Opens in Notepad</div>
          <div>cat linkedin_automation_tool - Opens in Notepad</div>
          <div>cat hackrx_query_system - Opens in Notepad</div>
        </div>
      </div>
    )
    this.generateResultRow(this.state.curInputTimes, help)
  }

  // Contact command - show contact information
  contact = () => {
    const contact = (
      <div className="text-gray-100 space-y-2">
        <div className="text-green-400 font-bold text-lg mb-3">📬 Contact Information</div>
        <div className="ml-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">Email:</span>
            <a href="mailto:tanveerlohare744@gmail.com" className="text-blue-400 hover:underline">
              tanveerlohare744@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">LinkedIn:</span>
            <a href="https://www.linkedin.com/in/shaik-tanveer-lohare/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              linkedin.com/in/shaik-tanveer-lohare
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">GitHub:</span>
            <a href="https://github.com/tanveer744" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              github.com/tanveer744
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">Instagram:</span>
            <a href="https://www.instagram.com/shaiktanveer_74" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              @shaiktanveer_74
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-semibold">Location:</span>
            <span className="text-gray-300">Bangalore, India</span>
          </div>
        </div>
        <div className="text-yellow-300 mt-3">
          💡 Feel free to reach out for collaboration or opportunities!
        </div>
      </div>
    )
    this.generateResultRow(this.state.curInputTimes, contact)
  }

  // Resume command - download resume
  resume = () => {
    const resume = (
      <div className="text-gray-100 space-y-2">
        <div className="text-green-400 font-bold mb-2">📄 Resume Download</div>
        <div className="ml-4">
          <div className="text-gray-300 mb-2">Preparing to download resume...</div>
          <div className="text-cyan-400">
            → <span className="text-blue-400">Shaik_Tanveer_Lohare_Resume.pdf</span>
          </div>
          <div className="text-yellow-300 mt-2">
            ✓ Download started! Check your downloads folder.
          </div>
        </div>
      </div>
    )
    this.generateResultRow(this.state.curInputTimes, resume)
    
    // Trigger actual download
    const link = document.createElement('a')
    link.href = '/resume/Shaik_Tanveer_Lohare_Resume.pdf'
    link.download = 'Shaik_Tanveer_Lohare_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Projects command - list all projects
  projects = () => {
    const projects = (
      <div className="text-gray-100 space-y-2">
        <div className="text-green-400 font-bold text-lg mb-3">🚀 My Projects</div>
        
        <div className="ml-4 space-y-4">
          {/* LinkedIn Automator */}
          <div className="border-l-2 border-cyan-500 pl-3">
            <div className="text-cyan-400 font-semibold text-base">🤖 LinkedIn Automator</div>
            <div className="text-gray-300 text-sm mt-1">
              AI-powered LinkedIn automation assistant with Tkinter GUI, Chrome sessions, and smart delays
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="text-purple-400">Python • Selenium • AI/ML</span>
              <a href="https://github.com/tanveer744/linkedin-automator" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                GitHub →
              </a>
            </div>
          </div>

          {/* HackRx Query System */}
          <div className="border-l-2 border-blue-500 pl-3">
            <div className="text-blue-400 font-semibold text-base">🧠 HackRx Query System</div>
            <div className="text-gray-300 text-sm mt-1">
              Intelligent document Q&A using FAISS, Azure OCR, and Gemini AI for policy documents
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="text-purple-400">Python • FAISS • Azure • Gemini</span>
              <span className="text-yellow-400">🏆 HackRx 5.0 Finalist</span>
            </div>
          </div>

          {/* Road Rage Detection */}
          <div className="border-l-2 border-green-500 pl-3">
            <div className="text-green-400 font-semibold text-base">🚗 Road Rage Detection</div>
            <div className="text-gray-300 text-sm mt-1">
              Real-time aggressive driving detection using 3D CNN, transfer learning, and computer vision
            </div>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="text-purple-400">Python • TensorFlow • OpenCV</span>
              <span className="text-yellow-400">📄 IEEE Publication</span>
            </div>
          </div>
        </div>
        
        <div className="text-yellow-300 mt-3">
          💡 Tip: Navigate to /projects folder for more details (cd projects)
        </div>
      </div>
    )
    this.generateResultRow(this.state.curInputTimes, projects)
  }

  // Skills command - show skills tree
  skills = () => {
    const skills = (
      <div className="text-gray-100 space-y-2 font-mono">
        <div className="text-green-400 font-bold text-lg mb-3">🛠️ Technical Skills</div>
        
        <div className="ml-4 space-y-3">
          {/* Programming Languages */}
          <div>
            <div className="text-cyan-400 font-semibold">📝 Programming Languages</div>
            <div className="ml-4 text-sm space-y-0.5 mt-1">
              <div className="text-gray-300">├─ <span className="text-yellow-400">Python</span> <span className="text-green-500">██████████</span> Expert</div>
              <div className="text-gray-300">├─ <span className="text-yellow-400">JavaScript</span> <span className="text-green-500">████████░░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-yellow-400">TypeScript</span> <span className="text-green-500">████████░░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-yellow-400">Java</span> <span className="text-green-500">███████░░░</span> Intermediate</div>
              <div className="text-gray-300">└─ <span className="text-yellow-400">C++</span> <span className="text-green-500">██████░░░░</span> Intermediate</div>
            </div>
          </div>

          {/* Web Development */}
          <div>
            <div className="text-cyan-400 font-semibold">🌐 Web Development</div>
            <div className="ml-4 text-sm space-y-0.5 mt-1">
              <div className="text-gray-300">├─ <span className="text-blue-400">React.js</span> <span className="text-green-500">█████████░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-blue-400">Node.js</span> <span className="text-green-500">████████░░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-blue-400">Express.js</span> <span className="text-green-500">████████░░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-blue-400">Next.js</span> <span className="text-green-500">███████░░░</span> Intermediate</div>
              <div className="text-gray-300">└─ <span className="text-blue-400">Tailwind CSS</span> <span className="text-green-500">█████████░</span> Advanced</div>
            </div>
          </div>

          {/* AI & Machine Learning */}
          <div>
            <div className="text-cyan-400 font-semibold">🤖 AI & Machine Learning</div>
            <div className="ml-4 text-sm space-y-0.5 mt-1">
              <div className="text-gray-300">├─ <span className="text-purple-400">TensorFlow</span> <span className="text-green-500">████████░░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-purple-400">PyTorch</span> <span className="text-green-500">███████░░░</span> Intermediate</div>
              <div className="text-gray-300">├─ <span className="text-purple-400">Scikit-learn</span> <span className="text-green-500">████████░░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-purple-400">Computer Vision</span> <span className="text-green-500">████████░░</span> Advanced</div>
              <div className="text-gray-300">└─ <span className="text-purple-400">NLP</span> <span className="text-green-500">███████░░░</span> Intermediate</div>
            </div>
          </div>

          {/* Databases */}
          <div>
            <div className="text-cyan-400 font-semibold">🗄️ Databases</div>
            <div className="ml-4 text-sm space-y-0.5 mt-1">
              <div className="text-gray-300">├─ <span className="text-orange-400">MongoDB</span> <span className="text-green-500">████████░░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-orange-400">PostgreSQL</span> <span className="text-green-500">███████░░░</span> Intermediate</div>
              <div className="text-gray-300">└─ <span className="text-orange-400">MySQL</span> <span className="text-green-500">███████░░░</span> Intermediate</div>
            </div>
          </div>

          {/* Tools & Platforms */}
          <div>
            <div className="text-cyan-400 font-semibold">🔧 Tools & Platforms</div>
            <div className="ml-4 text-sm space-y-0.5 mt-1">
              <div className="text-gray-300">├─ <span className="text-red-400">Git & GitHub</span> <span className="text-green-500">█████████░</span> Advanced</div>
              <div className="text-gray-300">├─ <span className="text-red-400">Docker</span> <span className="text-green-500">███████░░░</span> Intermediate</div>
              <div className="text-gray-300">├─ <span className="text-red-400">AWS</span> <span className="text-green-500">██████░░░░</span> Intermediate</div>
              <div className="text-gray-300">└─ <span className="text-red-400">Linux</span> <span className="text-green-500">████████░░</span> Advanced</div>
            </div>
          </div>
        </div>
        
        <div className="text-yellow-300 mt-3">
          💡 Tip: Visit /skills folder for detailed breakdowns (cd skills)
        </div>
      </div>
    )
    this.generateResultRow(this.state.curInputTimes, skills)
  }

  // Auto-complete command or path
  autoComplete = (text) => {
    if (text === '') return text

    const input = text.split(' ')
    const cmd = input[0]
    const args = input[1]

    let result = text

    if (args === undefined) {
      // Auto-complete command
      const guess = Object.keys(this.commands).find((item) => {
        return item.substring(0, cmd.length) === cmd
      })
      if (guess !== undefined) result = guess
    } else if (cmd === 'cd' || cmd === 'cat' || cmd === 'open') {
      // Auto-complete path
      const type = cmd === 'cd' ? 'folder' : 'file'
      const guess = this.state.curChildren.find((item) => {
        return item.type === type && item.title.toLowerCase().startsWith(args.toLowerCase())
      })
      if (guess !== undefined) result = cmd + ' ' + guess.title
    }
    return result
  }

  // Handle keyboard input
  keyPress = async (e) => {
    const keyCode = e.key
    const inputElement = document.querySelector(
      `#terminal-input-${this.state.curInputTimes}`
    )
    const inputText = inputElement.value.trim()
    const input = inputText.split(' ')

    if (keyCode === 'Enter') {
      // Execute command
      const newHistory = [...this.state.history, inputText]
      
      this.setState({
        history: newHistory,
        curHistory: newHistory.length
      })

      const cmd = input[0]
      const args = input[1]

      // Make input readonly
      inputElement.setAttribute('readonly', 'true')

      if (cmd && Object.keys(this.commands).includes(cmd)) {
        await this.commands[cmd](args)
      } else if (cmd !== '') {
        this.generateResultRow(
          this.state.curInputTimes,
          <span className="text-red-400">{`'${cmd}' is not recognized as a command. Type 'help' for available commands.`}</span>
        )
      }

      // Generate new input row
      this.setState({
        curInputTimes: this.state.curInputTimes + 1
      }, () => {
        this.generateInputRow(this.state.curInputTimes)
      })
    } else if (keyCode === 'ArrowUp') {
      // Previous history command
      if (this.state.history.length > 0) {
        const newCurHistory = Math.max(0, this.state.curHistory - 1)
        this.setState({ curHistory: newCurHistory })
        inputElement.value = this.state.history[newCurHistory]
      }
    } else if (keyCode === 'ArrowDown') {
      // Next history command
      if (this.state.history.length > 0) {
        const newCurHistory = Math.min(this.state.history.length, this.state.curHistory + 1)
        this.setState({ curHistory: newCurHistory })
        
        if (newCurHistory === this.state.history.length) {
          inputElement.value = ''
        } else {
          inputElement.value = this.state.history[newCurHistory]
        }
      }
    } else if (keyCode === 'Tab') {
      // Auto-complete
      inputElement.value = this.autoComplete(inputText)
      e.preventDefault()
    }
  }

  focusOnInput = (id) => {
    const input = document.querySelector(`#terminal-input-${id}`)
    if (input) {
      input.focus()
    }
  }

  generateInputRow = (id) => {
    const newRow = (
      <div key={`terminal-input-row-${id}`} className="flex items-center">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span className="text-green-400 font-semibold">
            tanveer@windows
          </span>
          <span className="text-blue-400 font-semibold">
            {this.getCurDirName()}
          </span>
          <span className="text-gray-400">$</span>
        </div>
        <input
          id={`terminal-input-${id}`}
          className="flex-1 px-2 text-white outline-none bg-transparent font-mono"
          onKeyDown={this.keyPress}
          autoFocus={true}
          spellCheck={false}
        />
      </div>
    )
    this.addRow(newRow)
  }

  generateResultRow = (id, result) => {
    const newRow = (
      <div key={`terminal-result-row-${id}`} className="break-words py-1">
        {result}
      </div>
    )
    this.addRow(newRow)
  }

  render() {
    return (
      <div className="terminal h-full flex flex-col bg-[#0c0c0c] text-white font-mono text-sm overflow-hidden">
        {/* Tab Bar - Windows Terminal Style */}
        <div className="h-10 bg-[#1e1e1e]/95 backdrop-blur-md border-b border-white/5 flex items-center px-2 gap-1 select-none">
          {this.state.tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`h-8 px-3 rounded-t flex items-center gap-2 cursor-pointer transition-all ${
                index === this.state.activeTab
                  ? 'bg-[#0c0c0c] text-white'
                  : 'bg-transparent text-gray-400 hover:bg-white/5'
              }`}
              onClick={() => this.setState({ activeTab: index })}
            >
              <span className="text-xs">⚡</span>
              <span className="text-xs font-medium">{tab.title}</span>
            </div>
          ))}
          <button
            className="h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white rounded transition-all"
            title="New tab"
          >
            <span className="text-lg leading-none">+</span>
          </button>
        </div>

        {/* Terminal Content Area with Acrylic Effect */}
        <div
          className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-[#0c0c0c] via-[#0c0c0c] to-[#1a1a2e]/30"
          onClick={() => this.focusOnInput(this.state.curInputTimes)}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)'
          }}
        >
          {/* Welcome Message */}
          <div className="text-cyan-400 mb-3">
            <div className="text-lg font-bold flex items-center gap-2">
              <span>⚡</span>
              <span>Tanveer&apos;s Terminal</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Interactive Portfolio Terminal - Explore my professional journey
            </div>
          </div>
          
          <div className="mb-3 text-gray-300">
            <span className="text-green-400">✓</span> Welcome! Type{' '}
            <span className="text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">help</span>{' '}
            to see available commands.
          </div>

          {/* Terminal Content */}
          <div id="terminal-content" className="space-y-1">
            {this.state.content}
          </div>
        </div>
      </div>
    )
  }
}

export default TerminalWrapper
