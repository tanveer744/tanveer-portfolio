// Notepad configuration - Windows equivalent of Bear
// This displays your blog posts, projects, and personal information

export const notepadData = [
  {
    id: "profile",
    title: "Profile",
    icon: "👤",
    notes: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "🐉",
        excerpt: "Hey there! I'm a developer passionate about creating beautiful experiences..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "📊",
        excerpt: "Here are some stats about my GitHub account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "🌐",
        excerpt: "Something about this personal portfolio website..."
      }
    ]
  },
  {
    id: "projects",
    title: "Projects",
    icon: "📦",
    notes: [
      {
        id: "project-1",
        title: "Portfolio Windows",
        file: "https://raw.githubusercontent.com/yourusername/portfolio-windows/main/README.md",
        icon: "🪟",
        excerpt: "My portfolio website simulating Windows 11's GUI...",
        link: "https://github.com/yourusername/portfolio-windows"
      },
      {
        id: "project-2",
        title: "Your Project",
        file: "markdown/projects/project-2.md",
        icon: "🚀",
        excerpt: "A cool project that does amazing things...",
        link: "https://github.com/yourusername/your-project"
      },
      {
        id: "project-3",
        title: "Another Project",
        file: "markdown/projects/project-3.md",
        icon: "⚡",
        excerpt: "Another awesome project...",
        link: "https://github.com/yourusername/another-project"
      }
    ]
  }
]

export default notepadData
