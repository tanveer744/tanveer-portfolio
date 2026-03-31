// Desktop apps that can open as windows
export const apps = [
  {
    id: 'notepad',
    title: 'Notepad',
    icon: '/img/icons/notepad.png',
    desktop: true,
    width: 1100,
    height: 700,
    show: false, // Don't show on startup
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: '/img/icons/terminal.png',
    desktop: true,
    width: 800,
    height: 600,
    show: false,
  },
  {
    id: 'camera',
    title: 'Camera',
    icon: '/img/icons/camera.png',
    desktop: true,
    width: 1200,
    height: 800,
    show: false,
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: '/img/icons/notepad.png', // Placeholder - will use gear icon later
    desktop: true,
    width: 1100,
    height: 700,
    show: false,
  },
  {
    id: 'explorer',
    title: 'File Explorer',
    icon: '/img/icons/vscode.png', // Placeholder - will use folder icon later
    desktop: true,
    width: 1000,
    height: 700,
    show: false,
  },
  {
    id: 'task-manager',
    title: 'Task Manager',
    icon: '/img/icons/terminal.png', // Placeholder - will use system monitor icon later
    desktop: true,
    width: 900,
    height: 600,
    show: false,
  },
  {
    id: 'edge',
    title: 'Microsoft Edge',
    icon: '/img/icons/edge.svg',
    desktop: true,
    width: 1024,
    height: 768,
    show: false,
  },
  {
    id: 'vscode',
    title: 'VS Code',
    icon: '/img/icons/vscode.png',
    desktop: true,
    width: 900,
    height: 600,
    show: false,
  },
  {
    id: 'github',
    title: 'GitHub',
    icon: '/img/icons/github.png',
    desktop: false, // External link, not a window
    link: 'https://github.com/tanveer744',
  },
]
