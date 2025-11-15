export const terminal = [
  {
    id: 'about',
    title: 'about',
    type: 'folder',
    children: [
      {
        id: 'about-bio',
        title: 'bio.txt',
        type: 'file',
        content: `Hello! I'm a Full Stack Developer passionate about creating beautiful and functional web experiences.
I love building modern web applications with React, TypeScript, and cutting-edge technologies.`
      },
      {
        id: 'about-skills',
        title: 'skills.txt',
        type: 'file',
        content: `Frontend: React, TypeScript, JavaScript, Tailwind CSS, Next.js
Backend: Node.js, Express, Python, Django
Tools: Git, Docker, VS Code, Vite
Databases: PostgreSQL, MongoDB, Redis`
      },
      {
        id: 'about-interests',
        title: 'interests.txt',
        type: 'file',
        content: 'Web Development / UI/UX Design / Open Source / Tech Innovation'
      },
      {
        id: 'about-contact',
        title: 'contact.txt',
        type: 'file',
        content: `Email: your.email@example.com
GitHub: github.com/yourusername
LinkedIn: linkedin.com/in/yourusername
Portfolio: yourportfolio.com`
      }
    ]
  },
  {
    id: 'projects',
    title: 'projects',
    type: 'folder',
    children: [
      {
        id: 'projects-portfolio',
        title: 'portfolio.txt',
        type: 'file',
        content: `Windows Portfolio Website
A modern portfolio website inspired by Windows 11 UI design.
Built with React, Vite, and Tailwind CSS.
Features interactive desktop environment with working apps.`
      },
      {
        id: 'projects-ecommerce',
        title: 'ecommerce.txt',
        type: 'file',
        content: `E-Commerce Platform
Full-stack e-commerce solution with payment integration.
Tech: React, Node.js, MongoDB, Stripe API
Features: Product management, cart, checkout, admin dashboard`
      },
      {
        id: 'projects-dashboard',
        title: 'dashboard.txt',
        type: 'file',
        content: `Analytics Dashboard
Real-time data visualization and reporting tool.
Tech: React, D3.js, TypeScript, WebSocket
Features: Interactive charts, real-time updates, export to PDF`
      }
    ]
  },
  {
    id: 'experience',
    title: 'experience',
    type: 'folder',
    children: [
      {
        id: 'experience-current',
        title: 'current.txt',
        type: 'file',
        content: `Senior Frontend Developer @ Tech Company (2023 - Present)
- Leading frontend architecture and development
- Mentoring junior developers
- Implementing modern React patterns and best practices`
      },
      {
        id: 'experience-previous',
        title: 'previous.txt',
        type: 'file',
        content: `Full Stack Developer @ Startup Inc (2021 - 2023)
- Built multiple web applications from scratch
- Worked with React, Node.js, and PostgreSQL
- Collaborated with design team on UI/UX improvements`
      }
    ]
  },
  {
    id: 'readme',
    title: 'readme.txt',
    type: 'file',
    content: `Welcome to my Windows Portfolio Terminal!

Available commands:
  help     - Show all available commands
  ls       - List files and folders in current directory
  cd       - Change directory (cd <folder>, cd .., cd ~)
  cat      - Display file content (cat <file>)
  clear    - Clear the terminal screen
  
Try exploring:
  cd about     - Learn more about me
  cd projects  - See my projects
  cd experience - View my work experience

Tips:
  - Use arrow keys (↑/↓) to navigate command history
  - Press Tab for auto-completion
  - Type 'cd ..' to go back to parent directory
  - Type 'cd ~' or just 'cd' to return to root

Have fun exploring! 🚀`
  }
]

export default terminal
