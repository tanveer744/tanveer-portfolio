import { useState, useEffect } from 'react'
import { IoClose, IoLogoGithub, IoPlayCircle, IoDocument, IoStar, IoGitBranch, IoCalendar, IoCheckmarkCircle } from 'react-icons/io5'
import { Z_INDEX } from '@/constants/zIndex'

/**
 * ProjectModal - Detailed project showcase modal
 * Displays comprehensive project information with screenshots, tech stack, and links
 */
export default function ProjectModal({ project, onClose }) {
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [imageError, setImageError] = useState(false)

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      style={{ zIndex: Z_INDEX.modals }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-window-open"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-14 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-between px-6 text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.icon}</span>
            <div>
              <h2 className="text-lg font-bold">{project.title}</h2>
              <p className="text-xs text-blue-100">{project.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
            title="Close (Esc)"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Screenshot Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {!imageError ? (
                  <img
                    src={project.screenshots[activeScreenshot]}
                    alt={`${project.title} screenshot ${activeScreenshot + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <span className="text-6xl mb-3">{project.icon}</span>
                    <p className="text-sm">Screenshot preview coming soon</p>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              {!imageError && project.screenshots.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {project.screenshots.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveScreenshot(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === activeScreenshot
                          ? 'bg-blue-500 w-8'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                      }`}
                      aria-label={`View screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                  <IoStar className="w-4 h-4" />
                  <span className="text-xs font-medium">Stars</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{project.stats.stars}</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                  <IoGitBranch className="w-4 h-4" />
                  <span className="text-xs font-medium">Forks</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{project.stats.forks}</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                  <IoCalendar className="w-4 h-4" />
                  <span className="text-xs font-medium">Year</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{project.year}</p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                  <IoCheckmarkCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Status</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{project.status}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                Overview
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {project.description}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-transform hover:scale-105"
                    style={{
                      backgroundColor: `${tech.color}15`,
                      borderColor: tech.color,
                      color: tech.color
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }} />
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <IoCheckmarkCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Awards (if any) */}
            {project.awards && project.awards.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-3">
                  Recognition
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.awards.map((award, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg border border-yellow-200 dark:border-yellow-800 text-sm font-medium"
                    >
                      🏆 {award}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer - Action Buttons */}
        <div className="h-16 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3 px-6 flex-shrink-0">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              <IoLogoGithub className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          )}
          
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <IoPlayCircle className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
          )}
          
          {project.links.paper && (
            <a
              href={project.links.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
            >
              <IoDocument className="w-5 h-5" />
              <span>Research Paper</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
