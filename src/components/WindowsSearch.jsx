import { apps } from '@/config/apps'
import { startMenuProjects } from '@/config/wallpapers'
import { 
  IoDocumentTextOutline, 
  IoGlobeOutline,
  IoCodeSlashOutline,
  IoAppsOutline,
  IoSettingsOutline,
  IoPersonOutline,
  IoArrowForwardOutline
} from 'react-icons/io5'

// Define searchable items including apps, social media, and projects
export const searchableItems = [
  // Apps
  ...apps.map(app => ({
    type: 'app',
    category: app.link ? 'Web' : 'Apps',
    description: app.link ? 'Open external link' : 'Open application',
    ...app
  })),
  // Projects from config
  ...startMenuProjects.map(project => ({
    type: 'project',
    category: 'Projects',
    id: project.id,
    title: project.title,
    description: project.description,
    icon: project.img,
    url: project.link
  })),
  // Social Media
  {
    id: 'github-profile',
    type: 'social',
    title: 'GitHub Profile',
    description: 'View my GitHub profile and repositories',
    icon: '/img/icons/github.png',
    url: 'https://github.com/tanveer744',
    category: 'Social Media'
  },
  {
    id: 'linkedin-profile',
    type: 'social',
    title: 'LinkedIn Profile',
    description: 'Connect with me on LinkedIn',
    icon: '/img/icons/linkedin.png',
    url: 'https://www.linkedin.com/in/shaik-tanveer-lohare/',
    category: 'Social Media'
  },
  {
    id: 'instagram-profile',
    type: 'social',
    title: 'Instagram Profile',
    description: 'Follow me on Instagram',
    icon: '/img/icons/instagram.png',
    url: 'https://www.instagram.com/shaiktanveer_74?igsh=NzZ4NWl1NHI4NXZ2',
    category: 'Social Media'
  },
  // Additional quick access items
  {
    id: 'settings',
    type: 'system',
    title: 'Settings',
    description: 'Adjust your system settings',
    icon: <IoSettingsOutline className="w-6 h-6" />,
    category: 'System',
    action: 'settings'
  },
  {
    id: 'about',
    type: 'document',
    title: 'About Me',
    description: 'Learn more about my background and experience',
    icon: <IoPersonOutline className="w-6 h-6" />,
    category: 'Documents',
    action: 'about-me'
  },
  {
    id: 'about-site',
    type: 'document',
    title: 'About This Site',
    description: 'Information about this portfolio website',
    icon: <IoCodeSlashOutline className="w-6 h-6" />,
    category: 'Documents',
    action: 'about-site'
  }
]

// Component to display search results dropdown
export default function WindowsSearch({ filteredItems, onItemClick }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Apps': return <IoAppsOutline className="w-4 h-4" />
      case 'Projects': return <IoCodeSlashOutline className="w-4 h-4" />
      case 'Social Media': return <IoGlobeOutline className="w-4 h-4" />
      case 'Documents': return <IoDocumentTextOutline className="w-4 h-4" />
      case 'System': return <IoSettingsOutline className="w-4 h-4" />
      case 'Web': return <IoGlobeOutline className="w-4 h-4" />
      default: return <IoPersonOutline className="w-4 h-4" />
    }
  }

  if (filteredItems.length === 0) {
    return null
  }

  return (
    <div 
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] w-[600px] max-w-[90vw] animate-slide-up"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="rounded-win acrylic border border-white/20 shadow-win overflow-hidden max-h-[500px] overflow-y-auto">
        <div className="p-4">
          {['Apps', 'Projects', 'Social Media', 'Documents', 'System', 'Web'].map(category => {
            const categoryItems = filteredItems.filter(item => item.category === category)
            
            if (categoryItems.length === 0) return null
            
            return (
              <div key={category} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 px-2">
                  {getCategoryIcon(category)}
                  <span>{category.toUpperCase()}</span>
                </div>
                <div className="space-y-1">
                  {categoryItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onItemClick(item)}
                      className="w-full flex items-center gap-4 p-3 rounded-win-sm hover:bg-white/70 dark:hover:bg-white/10 active:bg-white/50 dark:active:bg-white/5 transition-all group"
                    >
                      <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {item.icon?.startsWith?.('/') ? (
                          <img src={item.icon} alt={item.title} className="w-8 h-8 object-contain" />
                        ) : typeof item.icon === 'string' ? (
                          <div className="text-2xl">{item.icon}</div>
                        ) : (
                          <div className="text-gray-600 dark:text-gray-300">{item.icon}</div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 line-clamp-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <IoArrowForwardOutline className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
