// Enhanced project data with tech stacks, screenshots, and detailed metadata
// Used for ProjectModal component

export const projectsData = [
  {
    id: 'linkedin-automator',
    title: 'LinkedIn Automator',
    icon: '🤖',
    tagline: 'AI-powered LinkedIn automation assistant',
    description: 'Intelligent automation tool for LinkedIn built with Python, featuring a modern Tkinter GUI, smart session management with Chrome, and human-like interaction delays to maintain account safety.',
    longDescription: `A comprehensive LinkedIn automation solution that combines artificial intelligence with practical automation features. The tool helps professionals manage their LinkedIn presence efficiently while maintaining authentic engagement patterns.

Key features include automated connection requests, message scheduling, profile viewing automation, and intelligent engagement with posts. The system uses advanced algorithms to mimic human behavior, ensuring account safety and avoiding detection.`,
    
    technologies: [
      { name: 'Python', color: '#3776AB' },
      { name: 'Tkinter', color: '#FF6B6B' },
      { name: 'Selenium', color: '#43B02A' },
      { name: 'Chrome WebDriver', color: '#4285F4' },
      { name: 'AI/ML', color: '#FF6F00' }
    ],
    
    features: [
      'Smart delay algorithms to mimic human behavior',
      'Chrome session management for seamless automation',
      'Modern Tkinter GUI for easy control',
      'Automated connection requests and messaging',
      'Profile viewing and engagement automation',
      'Account safety features and rate limiting'
    ],
    
    screenshots: [
      '/img/projects/linkedin-automator-1.png',
      '/img/projects/linkedin-automator-2.png',
      '/img/projects/linkedin-automator-3.png'
    ],
    
    links: {
      github: 'https://github.com/tanveer744/linkedin-automator',
      demo: null,
      video: null
    },
    
    stats: {
      stars: '15+',
      forks: '5+',
      language: 'Python',
      lastUpdated: '2024'
    },
    
    category: 'Automation & AI',
    status: 'Active',
    year: '2024'
  },
  
  {
    id: 'query-document',
    title: 'HackRx Query System',
    icon: '🧠',
    tagline: 'Intelligent document Q&A platform',
    description: 'Advanced document processing and question-answering system built for HackRx 5.0, leveraging FAISS vector search, Azure OCR, and Google Gemini AI to extract insights from complex policy documents.',
    longDescription: `An enterprise-grade intelligent document processing platform designed to revolutionize how organizations interact with complex documentation. Built during HackRx 5.0 hackathon, this system combines cutting-edge AI technologies to provide accurate, context-aware answers to queries about policy documents.

The platform uses FAISS (Facebook AI Similarity Search) for lightning-fast semantic search, Azure Computer Vision for OCR, and Google Gemini AI for natural language understanding and response generation.`,
    
    technologies: [
      { name: 'Python', color: '#3776AB' },
      { name: 'FAISS', color: '#00A9E0' },
      { name: 'Azure OCR', color: '#0078D4' },
      { name: 'Google Gemini', color: '#4285F4' },
      { name: 'FastAPI', color: '#009688' },
      { name: 'React', color: '#61DAFB' }
    ],
    
    features: [
      'Vector-based semantic search with FAISS',
      'OCR processing for scanned documents',
      'Natural language query understanding',
      'Context-aware AI responses using Gemini',
      'Real-time document indexing',
      'Multi-document query support',
      'REST API for easy integration'
    ],
    
    screenshots: [
      '/img/projects/query-system-1.png',
      '/img/projects/query-system-2.png',
      '/img/projects/query-system-3.png'
    ],
    
    links: {
      github: 'https://github.com/tanveer744',
      demo: null,
      video: null
    },
    
    stats: {
      stars: '10+',
      forks: '3+',
      language: 'Python',
      lastUpdated: '2024'
    },
    
    category: 'AI & NLP',
    status: 'Active',
    year: '2024',
    awards: ['HackRx 5.0 Finalist']
  },
  
  {
    id: 'road-rage',
    title: 'Road Rage Detection',
    icon: '🚗',
    tagline: 'Real-time aggressive driving detection',
    description: 'Computer vision system for detecting aggressive driving behavior in real-time using 3D CNN architecture, transfer learning, and advanced video processing techniques.',
    longDescription: `A groundbreaking computer vision project that enhances road safety by automatically detecting aggressive driving patterns. The system analyzes video feeds in real-time to identify dangerous behaviors like tailgating, sudden lane changes, and aggressive acceleration.

Built using state-of-the-art deep learning techniques including 3D Convolutional Neural Networks for temporal pattern recognition and transfer learning from pre-trained models. The system achieves high accuracy while maintaining real-time performance suitable for deployment in traffic monitoring systems.`,
    
    technologies: [
      { name: 'Python', color: '#3776AB' },
      { name: 'TensorFlow', color: '#FF6F00' },
      { name: 'Keras', color: '#D00000' },
      { name: 'OpenCV', color: '#5C3EE8' },
      { name: '3D CNN', color: '#00D9FF' },
      { name: 'Transfer Learning', color: '#FFC107' }
    ],
    
    features: [
      '3D CNN architecture for temporal analysis',
      'Real-time video processing',
      'Transfer learning for improved accuracy',
      'Multi-behavior detection (tailgating, lane changes, etc.)',
      'Frame-by-frame analysis with context awareness',
      'Configurable sensitivity and thresholds',
      'Alert system for detected incidents'
    ],
    
    screenshots: [
      '/img/projects/road-rage-1.png',
      '/img/projects/road-rage-2.png',
      '/img/projects/road-rage-3.png'
    ],
    
    links: {
      github: 'https://github.com/tanveer744',
      demo: null,
      video: null,
      paper: 'Published in IEEE'
    },
    
    stats: {
      stars: '20+',
      forks: '8+',
      language: 'Python',
      lastUpdated: '2024'
    },
    
    category: 'Computer Vision & Deep Learning',
    status: 'Published',
    year: '2023',
    awards: ['IEEE Publication', 'Academic Excellence Award']
  }
]

export default projectsData
