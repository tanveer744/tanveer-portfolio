import { useStore } from '@/stores'

const socialMedia = [
  {
    id: 'github',
    title: 'GitHub',
    icon: '/img/icons/github.png',
    url: 'https://github.com/tanveer744'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: '/img/icons/linkedin.png',
    url: 'https://www.linkedin.com/in/shaik-tanveer-lohare/'
  },
  {
    id: 'instagram',
    title: 'Instagram',
    icon: '/img/icons/instagram.png',
    url: 'https://www.instagram.com/shaiktanveer_74?igsh=NzZ4NWl1NHI4NXZ2'
  }
]

export default function DesktopIcons() {
  const { openApp } = useStore()

  const handleClick = (item) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4" style={{ gridAutoRows: 'min-content' }}>
      {socialMedia.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className="flex flex-col items-center w-20 p-2 rounded hover:bg-white/10 transition-colors duration-200"
          title={item.title}
        >
          <img src={item.icon} alt={item.title} className="w-12 h-12 mb-1" />
          <span className="text-white text-sm text-center text-shadow">{item.title}</span>
        </button>
      ))}
    </div>
  )
}
