import { create } from 'zustand'

export const useStore = create((set) => ({
  // System state
  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode }),
  
  // Window management
  windows: [],
  activeWindow: null,
  addWindow: (window) => set((state) => ({ 
    windows: [...state.windows, { ...window, isMinimized: false, isMaximized: false }],
    activeWindow: window.id 
  })),
  removeWindow: (id) => set((state) => {
    const newWindows = state.windows.filter(w => w.id !== id)
    return {
      windows: newWindows,
      activeWindow: newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null
    }
  }),
  setActiveWindow: (id) => set({ activeWindow: id }),
  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ),
    activeWindow: state.windows.find(w => w.id !== id && !w.isMinimized)?.id || null
  })),
  restoreWindow: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isMinimized: false } : w
    ),
    activeWindow: id
  })),
  toggleMaximizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    )
  })),
  
  // Start Menu
  showStartMenu: false,
  toggleStartMenu: () => set((state) => ({ 
    showStartMenu: !state.showStartMenu
  })),
  setShowStartMenu: (show) => set({ 
    showStartMenu: show
  }),
  
  // User info
  user: {
    name: 'User',
    avatar: '👤',
  },
  setUser: (user) => set({ user }),
  
  // Desktop icon positions
  iconPositions: {},
  setIconPosition: (id, position) => set((state) => ({
    iconPositions: {
      ...state.iconPositions,
      [id]: position
    }
  })),
  resetIconPositions: () => set({ iconPositions: {} }),
  
  // Page navigation
  currentPage: 'boot',
  setCurrentPage: (page) => set({ currentPage: page }),
  powerOff: () => {
    // Close all windows and start menu when powering off
    set({ 
      windows: [],
      activeWindow: null,
      showStartMenu: false,
      showSearch: false,
      currentPage: 'boot'
    })
  },
}))
