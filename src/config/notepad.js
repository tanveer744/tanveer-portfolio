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
        id: "linkedin-automator",
        title: "LinkedIn Automator",
        file: "markdown/projects/linkedin-automator.md",
        icon: "🤖",
        excerpt: "AI-powered LinkedIn automation assistant with Tkinter GUI, Chrome sessions, and smart delays",
        link: "https://github.com/tanveer744/linkedin-automator"
      },
      {
        id: "query-document",
        title: "HackRx Query System",
        file: "markdown/projects/query-document.md",
        icon: "🧠",
        excerpt: "Intelligent document processing platform using FAISS, Azure OCR, and Gemini AI for policy Q&A",
        link: "https://github.com/tanveer744"
      },
      {
        id: "road-rage",
        title: "Road Rage Detection",
        file: "markdown/projects/road-rage.md",
        icon: "🚗",
        excerpt: "Real-time aggressive driving detection using 3D CNN, transfer learning, and computer vision",
        link: "https://github.com/tanveer744"
      }
    ]
  }
]

export default notepadData
