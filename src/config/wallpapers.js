// Wallpaper collection with theme variants
export const wallpapersList = [
  {
    id: 'windows-default',
    name: 'Windows Default',
    thumbnail: '/img/wallpapers/windows-wallpaper2.png',
    image: '/img/wallpapers/windows-wallpaper2.png',
    theme: 'both' // Works for both light and dark
  },
  {
    id: 'windows-bloom',
    name: 'Windows Bloom',
    thumbnail: '/img/wallpapers/windows-wallpaper2.png',
    image: '/img/wallpapers/windows-wallpaper2.png',
    theme: 'light'
  },
  {
    id: 'windows-flow',
    name: 'Windows Flow',
    thumbnail: '/img/wallpapers/windows-wallpaper2.png',
    image: '/img/wallpapers/windows-wallpaper2.png',
    theme: 'both'
  },
  {
    id: 'gradient-sunset',
    name: 'Gradient Sunset',
    thumbnail: '/img/wallpapers/windows-wallpaper2.png',
    image: '/img/wallpapers/windows-wallpaper2.png',
    theme: 'light'
  },
  {
    id: 'gradient-ocean',
    name: 'Gradient Ocean',
    thumbnail: '/img/wallpapers/windows-wallpaper2.png',
    image: '/img/wallpapers/windows-wallpaper2.png',
    theme: 'dark'
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    thumbnail: '/img/wallpapers/windows-wallpaper2.png',
    image: '/img/wallpapers/windows-wallpaper2.png',
    theme: 'dark'
  }
]

// Legacy support for existing code
export const wallpapers = {
  light: wallpapersList[0].image,
  dark: wallpapersList[0].image,
}

// Projects to show in Start Menu (like Launchpad in macOS)
export const startMenuProjects = [
  {
    id: 'linkedin-automator',
    title: 'LinkedIn Automator',
    img: '/img/icons/projects/linkedin-automator.svg',
    link: 'https://github.com/tanveer744/linkedin-automator',
    description: 'AI-powered LinkedIn automation assistant with Tkinter GUI'
  },
  {
    id: 'query-document',
    title: 'HackRx Query System',
    img: '/img/icons/projects/query-document.svg',
    link: 'https://github.com/tanveer744',
    description: 'Intelligent document processing & policy Q&A platform using FAISS and Gemini AI'
  },
  {
    id: 'road-rage',
    title: 'Road Rage Detection',
    img: '/img/icons/projects/road-rage.svg',
    link: 'https://github.com/tanveer744',
    description: 'Real-time aggressive driving detection using 3D CNN and computer vision'
  },
]
