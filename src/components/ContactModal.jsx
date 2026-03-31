import React, { useState } from 'react'
import { IoClose, IoMail, IoLogoLinkedin, IoLogoGithub, IoCopy, IoCheckmarkCircle } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactModal({ isOpen, onClose }) {
  const [copiedField, setCopiedField] = useState(null)

  const contactInfo = {
    email: 'tanveer.professional@gmail.com',
    linkedin: 'https://linkedin.com/in/tanveer744',
    github: 'https://github.com/tanveer744',
    portfolio: window.location.origin
  }

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-[#1e1e1e] border border-[#3c3c3c] rounded-lg shadow-2xl w-full max-w-md mx-4"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#3c3c3c]">
            <div className="flex items-center space-x-2">
              <IoMail className="w-5 h-5 text-[#569cd6]" />
              <h2 className="text-lg font-semibold text-[#d4d4d4]">Let's Connect!</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-[#2d2d30] transition-colors"
            >
              <IoClose className="w-5 h-5 text-[#cccccc]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#d4d4d4] mb-2">
                Ready to Work Together?
              </h3>
              <p className="text-[#969696] text-sm leading-relaxed">
                I'm always interested in discussing new opportunities, collaborating on exciting projects, 
                or just chatting about technology and software development.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center justify-between p-3 bg-[#252526] rounded-lg hover:bg-[#2d2d30] transition-colors">
                <div className="flex items-center space-x-3">
                  <IoMail className="w-5 h-5 text-[#569cd6] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-[#d4d4d4]">Email</div>
                    <div className="text-xs text-[#969696]">{contactInfo.email}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(contactInfo.email, 'email')}
                    className="p-2 rounded hover:bg-[#3c3c3c] transition-colors"
                    title="Copy email"
                  >
                    {copiedField === 'email' ? (
                      <IoCheckmarkCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <IoCopy className="w-4 h-4 text-[#cccccc]" />
                    )}
                  </button>
                  <button
                    onClick={() => window.location.href = `mailto:${contactInfo.email}`}
                    className="px-3 py-1 text-xs bg-[#569cd6] text-white rounded hover:bg-[#4a8bc2] transition-colors"
                  >
                    Send Email
                  </button>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center justify-between p-3 bg-[#252526] rounded-lg hover:bg-[#2d2d30] transition-colors">
                <div className="flex items-center space-x-3">
                  <IoLogoLinkedin className="w-5 h-5 text-[#0a66c2] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-[#d4d4d4]">LinkedIn</div>
                    <div className="text-xs text-[#969696]">Professional networking</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(contactInfo.linkedin, 'linkedin')}
                    className="p-2 rounded hover:bg-[#3c3c3c] transition-colors"
                    title="Copy LinkedIn URL"
                  >
                    {copiedField === 'linkedin' ? (
                      <IoCheckmarkCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <IoCopy className="w-4 h-4 text-[#cccccc]" />
                    )}
                  </button>
                  <button
                    onClick={() => openExternalLink(contactInfo.linkedin)}
                    className="px-3 py-1 text-xs bg-[#0a66c2] text-white rounded hover:bg-[#0958a5] transition-colors"
                  >
                    Connect
                  </button>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center justify-between p-3 bg-[#252526] rounded-lg hover:bg-[#2d2d30] transition-colors">
                <div className="flex items-center space-x-3">
                  <IoLogoGithub className="w-5 h-5 text-[#f0f6fc] flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-[#d4d4d4]">GitHub</div>
                    <div className="text-xs text-[#969696]">Code repositories & projects</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(contactInfo.github, 'github')}
                    className="p-2 rounded hover:bg-[#3c3c3c] transition-colors"
                    title="Copy GitHub URL"
                  >
                    {copiedField === 'github' ? (
                      <IoCheckmarkCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <IoCopy className="w-4 h-4 text-[#cccccc]" />
                    )}
                  </button>
                  <button
                    onClick={() => openExternalLink(contactInfo.github)}
                    className="px-3 py-1 text-xs bg-[#238636] text-white rounded hover:bg-[#1f7a2e] transition-colors"
                  >
                    View Code
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#252526] rounded-lg p-4">
              <h4 className="text-sm font-semibold text-[#d4d4d4] mb-3">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center p-2 bg-[#1e1e1e] rounded">
                  <div className="text-[#569cd6] font-semibold">24h</div>
                  <div className="text-[#969696]">Response Time</div>
                </div>
                <div className="text-center p-2 bg-[#1e1e1e] rounded">
                  <div className="text-[#89d185] font-semibold">Available</div>
                  <div className="text-[#969696]">Status</div>
                </div>
                <div className="text-center p-2 bg-[#1e1e1e] rounded">
                  <div className="text-[#ffcc02] font-semibold">Remote</div>
                  <div className="text-[#969696]">Work Style</div>
                </div>
                <div className="text-center p-2 bg-[#1e1e1e] rounded">
                  <div className="text-[#f14c4c] font-semibold">2-4 weeks</div>
                  <div className="text-[#969696]">Notice Period</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <p className="text-xs text-[#969696] mb-3">
                Looking forward to building something amazing together! 🚀
              </p>
              <button
                onClick={onClose}
                className="w-full py-2 px-4 bg-[#569cd6] text-white rounded font-medium hover:bg-[#4a8bc2] transition-colors"
              >
                Let's Connect!
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}