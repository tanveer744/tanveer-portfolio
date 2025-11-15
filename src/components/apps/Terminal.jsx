import { Component } from 'react'
import terminal from '@/config/terminal'

class Terminal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
      history: [],
      curHistory: 0,
      curInputTimes: 0,
      curDirPath: [],
      curChildren: terminal
    }
    
    this.commands = {
      cd: this.cd,
      ls: this.ls,
      cat: this.cat,
      clear: this.clear,
      help: this.help
    }
  }

  componentDidMount() {
    this.reset()
    this.generateInputRow(this.state.curInputTimes)
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
  cat = (args) => {
    const file = this.state.curChildren.find((item) => {
      return item.title === args && item.type === 'file'
    })

    if (file === undefined) {
      this.generateResultRow(
        this.state.curInputTimes,
        <span className="text-red-400">{`cat: ${args}: No such file or directory`}</span>
      )
    } else {
      this.generateResultRow(
        this.state.curInputTimes, 
        <div className="whitespace-pre-wrap text-gray-100">{file.content}</div>
      )
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

  // Show help
  help = () => {
    const help = (
      <div className="text-gray-100 space-y-1">
        <div className="text-green-400 font-bold mb-2">Available Commands:</div>
        <div className="ml-4 space-y-1">
          <div><span className="text-cyan-400">cat &lt;file&gt;</span> - Display the content of a file</div>
          <div><span className="text-cyan-400">cd &lt;dir&gt;</span> - Change directory (cd .. for parent, cd ~ for root)</div>
          <div><span className="text-cyan-400">ls</span> - List files and folders in current directory</div>
          <div><span className="text-cyan-400">clear</span> - Clear the terminal screen</div>
          <div><span className="text-cyan-400">help</span> - Display this help menu</div>
        </div>
        <div className="text-yellow-300 mt-3">
          💡 Tips: Use ↑/↓ arrow keys for command history, Tab for auto-complete
        </div>
      </div>
    )
    this.generateResultRow(this.state.curInputTimes, help)
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
    } else if (cmd === 'cd' || cmd === 'cat') {
      // Auto-complete path
      const type = cmd === 'cd' ? 'folder' : 'file'
      const guess = this.state.curChildren.find((item) => {
        return item.type === type && item.title.substring(0, args.length) === args
      })
      if (guess !== undefined) result = cmd + ' ' + guess.title
    }
    return result
  }

  // Handle keyboard input
  keyPress = (e) => {
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
        this.commands[cmd](args)
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
            user@windows
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
      <div
        className="terminal h-full bg-gray-900 text-white font-mono text-sm overflow-y-auto p-4"
        onClick={() => this.focusOnInput(this.state.curInputTimes)}
      >
        {/* Welcome Message */}
        <div className="text-cyan-400 mb-3">
          <div className="text-lg font-bold">Windows PowerShell</div>
          <div className="text-xs text-gray-400 mt-1">Copyright (c) Portfolio Inc. All rights reserved.</div>
        </div>
        
        <div className="mb-3 text-gray-300">
          <span className="text-green-400">✓</span> Welcome to the terminal! Type <span className="text-cyan-400">help</span> to get started.
        </div>

        {/* Terminal Content */}
        <div id="terminal-content" className="space-y-1">
          {this.state.content}
        </div>
      </div>
    )
  }
}

export default Terminal
