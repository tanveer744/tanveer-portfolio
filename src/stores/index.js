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
    showStartMenu: !state.showStartMenu,
    showSearch: false // Close search when opening start menu
  })),
  setShowStartMenu: (show) => set({ 
    showStartMenu: show,
    showSearch: !show && false // Close search when toggling start menu
  }),
  
  // Search
  showSearch: false,
  toggleSearch: () => set((state) => ({ 
    showSearch: !state.showSearch,
    showStartMenu: false // Close start menu when opening search
  })),
  setShowSearch: (show) => set({ 
    showSearch: show,
    showStartMenu: show ? false : state.showStartMenu // Close start menu when opening search
  }),
  
  // User info
  user: {
    name: 'User',
    avatar: '👤',
  },
  setUser: (user) => set({ user }),
}))
