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
    id: 'terminal',
    title: 'Terminal',
    icon: '/img/icons/terminal.png',
    desktop: true,
    width: 800,
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
