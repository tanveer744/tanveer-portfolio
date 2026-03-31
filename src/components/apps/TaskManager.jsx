import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaServer, 
  FaMemory, 
  FaNetworkWired, 
  FaDatabase,
  FaReact,
  FaPython,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaCode,
  FaCogs,
  FaChartBar
} from 'react-icons/fa'
import { 
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiExpress
} from 'react-icons/si'

// Skills data structured for Task Manager visualization
const skillsData = {
  webDevelopment: [
    { name: 'React', proficiency: 95, icon: <FaReact className="text-blue-400" />, status: 'Running' },
    { name: 'JavaScript', proficiency: 90, icon: <SiJavascript className="text-yellow-400" />, status: 'Running' },
    { name: 'TypeScript', proficiency: 85, icon: <SiTypescript className="text-blue-500" />, status: 'Running' },
    { name: 'Tailwind CSS', proficiency: 90, icon: <SiTailwindcss className="text-cyan-400" />, status: 'Running' },
    { name: 'Node.js', proficiency: 85, icon: <FaNodeJs className="text-green-600" />, status: 'Running' },
    { name: 'Express', proficiency: 80, icon: <SiExpress className="text-gray-600" />, status: 'Running' },
  ],
  aiMl: [
    { name: 'Python', proficiency: 90, icon: <FaPython className="text-blue-500" />, status: 'Running' },
    { name: 'TensorFlow', proficiency: 75, icon: <SiTensorflow className="text-orange-500" />, status: 'Running' },
    { name: 'PyTorch', proficiency: 70, icon: <SiPytorch className="text-red-500" />, status: 'Running' },
    { name: 'FastAPI', proficiency: 85, icon: <SiFastapi className="text-teal-500" />, status: 'Running' },
    { name: 'FAISS', proficiency: 75, icon: <FaDatabase className="text-purple-500" />, status: 'Running' },
  ],
  toolsPlatforms: [
    { name: 'Git', proficiency: 90, icon: <FaGitAlt className="text-orange-600" />, status: 'Running' },
    { name: 'Docker', proficiency: 80, icon: <FaDocker className="text-blue-500" />, status: 'Running' },
    { name: 'AWS', proficiency: 75, icon: <FaAws className="text-orange-400" />, status: 'Running' },
    { name: 'MongoDB', proficiency: 85, icon: <SiMongodb className="text-green-500" />, status: 'Running' },
    { name: 'PostgreSQL', proficiency: 80, icon: <SiPostgresql className="text-blue-600" />, status: 'Running' },
  ]
}

function ProcessTab() {
  const allSkills = [
    ...skillsData.webDevelopment,
    ...skillsData.aiMl,
    ...skillsData.toolsPlatforms
  ]

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
          <tr>
            <th className="text-left px-4 py-2 font-medium text-gray-700 dark:text-gray-300">Name</th>
            <th className="text-left px-4 py-2 font-medium text-gray-700 dark:text-gray-300">Status</th>
            <th className="text-right px-4 py-2 font-medium text-gray-700 dark:text-gray-300">CPU</th>
            <th className="text-right px-4 py-2 font-medium text-gray-700 dark:text-gray-300">Memory</th>
          </tr>
        </thead>
        <tbody>
          {allSkills.map((skill, index) => (
            <motion.tr
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-4 py-2 flex items-center gap-2">
                <span className="text-lg">{skill.icon}</span>
                <span className="text-gray-900 dark:text-gray-100">{skill.name}</span>
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{skill.status}</td>
              <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">
                {skill.proficiency}%
              </td>
              <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100">
                {Math.round(skill.proficiency * 0.8)} MB
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PerformanceTab() {
  const categories = [
    { name: 'Web Development', skills: skillsData.webDevelopment, icon: <FaCode />, color: 'blue' },
    { name: 'AI & Machine Learning', skills: skillsData.aiMl, icon: <FaServer />, color: 'purple' },
    { name: 'Tools & Platforms', skills: skillsData.toolsPlatforms, icon: <FaNetworkWired />, color: 'green' }
  ]

  const getAverageProficiency = (skills) => {
    return Math.round(skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length)
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      green: 'from-green-500 to-green-600'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="space-y-6">
        {categories.map((category, catIndex) => {
          const avgProficiency = getAverageProficiency(category.skills)
          
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl text-gray-700 dark:text-gray-300">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Average Proficiency: {avgProficiency}%
                  </p>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {avgProficiency}%
                </div>
              </div>

              {/* Overall progress bar */}
              <div className="mb-4 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${avgProficiency}%` }}
                  transition={{ duration: 1, delay: catIndex * 0.1 + 0.2 }}
                  className={`h-full bg-gradient-to-r ${getColorClasses(category.color)}`}
                />
              </div>

              {/* Individual skills */}
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <div className="text-lg">{skill.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ 
                            duration: 0.8, 
                            delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3 
                          }}
                          className={`h-full bg-gradient-to-r ${getColorClasses(category.color)}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* System stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 grid grid-cols-3 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
          <FaServer className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Skills</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {Object.values(skillsData).flat().length}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
          <FaMemory className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {Object.keys(skillsData).length}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 text-center">
          <FaNetworkWired className="w-8 h-8 mx-auto mb-2 text-green-500" />
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Proficiency</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {Math.round(
              Object.values(skillsData)
                .flat()
                .reduce((acc, skill) => acc + skill.proficiency, 0) /
                Object.values(skillsData).flat().length
            )}%
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function TaskManager({ windowData }) {
  const [activeTab, setActiveTab] = useState('processes')

  const tabs = [
    { id: 'processes', label: 'Processes', icon: <FaCode /> },
    { id: 'performance', label: 'Performance', icon: <FaChartBar /> },
  ]

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Tabs */}
      <div className="h-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-2 font-medium text-sm flex items-center gap-2
              border-b-2 transition-colors
              ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'processes' && <ProcessTab />}
      {activeTab === 'performance' && <PerformanceTab />}
    </div>
  )
}
