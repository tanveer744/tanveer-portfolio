// Terminal file structure configuration
// Files will be loaded from public/terminal-resume/

export const terminal = [
  {
    id: 'about',
    title: 'about',
    type: 'folder',
    children: [
      {
        id: 'about-profile',
        title: 'profile.txt',
        type: 'file',
        path: '/terminal-resume/about/profile.txt'
      },
      {
        id: 'about-career',
        title: 'career_objective.txt',
        type: 'file',
        path: '/terminal-resume/about/career_objective.txt'
      },
      {
        id: 'about-soft-skills',
        title: 'soft_skills.txt',
        type: 'file',
        path: '/terminal-resume/about/soft_skills.txt'
      }
    ]
  },
  {
    id: 'projects',
    title: 'projects',
    type: 'folder',
    children: [
      {
        id: 'projects-hackrx',
        title: 'hackrx_query_system.txt',
        type: 'file',
        path: '/terminal-resume/projects/hackrx_query_system.txt'
      },
      {
        id: 'projects-road-rage',
        title: 'road_rage_detection.txt',
        type: 'file',
        path: '/terminal-resume/projects/road_rage_detection.txt'
      },
      {
        id: 'projects-linkedin',
        title: 'linkedin_automation_tool.txt',
        type: 'file',
        path: '/terminal-resume/projects/linkedin_automation_tool.txt'
      },
      {
        id: 'projects-other',
        title: 'other_projects.txt',
        type: 'file',
        path: '/terminal-resume/projects/other_projects.txt'
      }
    ]
  },
  {
    id: 'experience',
    title: 'experience',
    type: 'folder',
    children: [
      {
        id: 'experience-internship',
        title: 'dev_creations_and_solutions_internship.txt',
        type: 'file',
        path: '/terminal-resume/experience/dev_creations_and_solutions_internship.txt'
      }
    ]
  },
  {
    id: 'education',
    title: 'education',
    type: 'folder',
    children: [
      {
        id: 'education-reva',
        title: 'reva_university.txt',
        type: 'file',
        path: '/terminal-resume/education/reva_university.txt'
      }
    ]
  },
  {
    id: 'skills',
    title: 'skills',
    type: 'folder',
    children: [
      {
        id: 'skills-technical',
        title: 'technical_skills.txt',
        type: 'file',
        path: '/terminal-resume/skills/technical_skills.txt'
      },
      {
        id: 'skills-web',
        title: 'tech_stack_web.txt',
        type: 'file',
        path: '/terminal-resume/skills/tech_stack_web.txt'
      },
      {
        id: 'skills-ai-ml',
        title: 'tech_stack_ai_ml.txt',
        type: 'file',
        path: '/terminal-resume/skills/tech_stack_ai_ml.txt'
      },
      {
        id: 'skills-tools',
        title: 'tools_and_platforms.txt',
        type: 'file',
        path: '/terminal-resume/skills/tools_and_platforms.txt'
      }
    ]
  },
  {
    id: 'certifications',
    title: 'certifications',
    type: 'folder',
    children: [
      {
        id: 'cert-ml',
        title: 'ml_for_beginners.txt',
        type: 'file',
        path: '/terminal-resume/certifications/ml_for_beginners.txt'
      },
      {
        id: 'cert-ibm',
        title: 'data_science_methodology_ibm.txt',
        type: 'file',
        path: '/terminal-resume/certifications/data_science_methodology_ibm.txt'
      },
      {
        id: 'cert-ai-python',
        title: 'ai_python_for_beginners.txt',
        type: 'file',
        path: '/terminal-resume/certifications/ai_python_for_beginners.txt'
      },
      {
        id: 'cert-prompt',
        title: 'prompt_engineering_for_vision_models.txt',
        type: 'file',
        path: '/terminal-resume/certifications/prompt_engineering_for_vision_models.txt'
      },
      {
        id: 'cert-sql',
        title: 'sql_for_beginners_scaler.txt',
        type: 'file',
        path: '/terminal-resume/certifications/sql_for_beginners_scaler.txt'
      }
    ]
  },
  {
    id: 'achievements',
    title: 'achievements',
    type: 'folder',
    children: [
      {
        id: 'achievement-ieee',
        title: 'ieee_publication.txt',
        type: 'file',
        path: '/terminal-resume/achievements/ieee_publication.txt'
      },
      {
        id: 'achievement-competition',
        title: 'ai_rena_competition.txt',
        type: 'file',
        path: '/terminal-resume/achievements/ai_rena_competition.txt'
      }
    ]
  },
  {
    id: 'interests',
    title: 'interests',
    type: 'folder',
    children: [
      {
        id: 'interest-diy',
        title: 'diy_projects.txt',
        type: 'file',
        path: '/terminal-resume/interests/diy_projects.txt'
      },
      {
        id: 'interest-poetry',
        title: 'urdu_poetry.txt',
        type: 'file',
        path: '/terminal-resume/interests/urdu_poetry.txt'
      },
      {
        id: 'interest-chess',
        title: 'chess.txt',
        type: 'file',
        path: '/terminal-resume/interests/chess.txt'
      }
    ]
  },
  {
    id: 'readme',
    title: 'readme.txt',
    type: 'file',
    path: '/terminal-resume/readme.txt'
  },
  {
    id: 'resume',
    title: 'resume.pdf',
    type: 'file',
    path: '/terminal-resume/resume.pdf'
  }
]

export default terminal
