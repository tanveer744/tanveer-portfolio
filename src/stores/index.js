import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TASKBAR_HEIGHT, clampToWorkspace } from '@/constants/layout'

/**
 * Utility: Enforce window boundaries for ANY window operation
 * This ensures windows NEVER overlap the taskbar (64px at bottom)
 * 
 * To adjust taskbar height in the future:
 * - Update TASKBAR_HEIGHT in @/constants/layout.js
 * - The h-16 class on Taskbar component = 4rem = 64px
 */
const enforceWindowBoundaries = (x, y, width, height, debugContext = '') => {
  const workspaceHeight = window.innerHeight - TASKBAR_HEIGHT
  const workspaceWidth = window.innerWidth
  
  // Clamp position and size to workspace
  const clampedX = Math.max(0, Math.min(x, workspaceWidth - width))
  const clampedY = Math.max(0, Math.min(y, workspaceHeight - height))
  
  // Debug logging (disable in production)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Window Boundaries ${debugContext}]`, {
      input: { x, y, width, height },
      output: { x: clampedX, y: clampedY, width, height },
      workspace: { workspaceWidth, workspaceHeight, taskbarHeight: TASKBAR_HEIGHT },
      isConstrained: clampedX !== x || clampedY !== y
    })
  }
  
  return { x: clampedX, y: clampedY }
}

export const useStore = create(
  persist(
    (set) => ({
      // System state
      darkMode: false,
      setDarkMode: (darkMode) => set({ darkMode }),
  
  // Window management
  windows: [],
  activeWindow: null,
  nextZIndex: 1000,
  
  addWindow: (window) => set((state) => {
    const newZIndex = state.nextZIndex
    const workspaceHeight = globalThis.innerHeight - TASKBAR_HEIGHT
    const workspaceWidth = globalThis.innerWidth
    
    // Get initial dimensions
    const requestedWidth = window.width ?? 800
    const requestedHeight = window.height ?? 600
    const initialX = window.x ?? 100
    const initialY = window.y ?? 100
    
    // CRITICAL: Clamp height to fit within workspace
    // If window is taller than workspace, limit it to workspace height minus some padding
    const maxHeight = Math.max(300, workspaceHeight - 100) // Leave 100px padding for positioning
    const clampedHeight = Math.min(requestedHeight, maxHeight)
    const clampedWidth = Math.min(requestedWidth, workspaceWidth - 100)
    
    // Clamp position to workspace (respecting taskbar)
    const { x: clampedX, y: clampedY } = clampToWorkspace(initialX, initialY, clampedWidth, clampedHeight)
    
    // Debug log for initial window creation
    if (process.env.NODE_ENV === 'development') {
      console.log('[addWindow]', {
        requested: { width: requestedWidth, height: requestedHeight },
        clamped: { width: clampedWidth, height: clampedHeight },
        position: { x: clampedX, y: clampedY },
        workspace: { workspaceWidth, workspaceHeight, taskbarHeight: TASKBAR_HEIGHT }
      })
    }
    
    const defaultWindow = {
      id: window.id || `window-${Date.now()}`,
      appId: window.appId,
      title: window.title || 'Untitled',
      icon: window.icon || '📱',
      x: clampedX,
      y: clampedY,
      width: clampedWidth,
      height: clampedHeight,
      minWidth: window.minWidth ?? 400,
      minHeight: window.minHeight ?? 300,
      isMinimized: false,
      isMinimizing: false,
      isRestoring: false,
      isClosing: false,
      isMaximized: false,
      isFullscreen: false,
      zIndex: newZIndex,
      // Store original position for restore
      restoreX: clampedX,
      restoreY: clampedY,
      restoreWidth: clampedWidth,
      restoreHeight: clampedHeight,
      // Pass through any additional data
      ...(window.data && { data: window.data })
    }
    return { 
      windows: [...state.windows, defaultWindow],
      activeWindow: defaultWindow.id,
      nextZIndex: newZIndex + 1
    }
  }),
  
  removeWindow: (id) => set((state) => {
    const newWindows = state.windows.filter(w => w.id !== id)
    return {
      windows: newWindows,
      activeWindow: newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null
    }
  }),
  
  // Mark window as closing (for animation)
  closeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isClosing: true } : w
    )
  })),
  
  setActiveWindow: (id) => set((state) => {
    const maxZ = Math.max(...state.windows.map(w => w.zIndex), state.nextZIndex - 1)
    return {
      activeWindow: id,
      windows: state.windows.map(w => 
        w.id === id ? { ...w, zIndex: maxZ + 1 } : w
      ),
      nextZIndex: maxZ + 2
    }
  }),
  
  minimizeWindow: (id) => set((state) => {
    const newWindows = state.windows.map(w => 
      w.id === id ? { ...w, isMinimized: true, isMinimizing: false } : w
    )
    const nextActive = newWindows
      .filter(w => !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0]
    
    return {
      windows: newWindows,
      activeWindow: nextActive?.id || null
    }
  }),
  
  // Actually hide the minimized window (called after animation)
  completeMinimize: (id) => set((state) => {
    const newWindows = state.windows.map(w => 
      w.id === id ? { ...w, isMinimized: true, isMinimizing: false } : w
    )
    const nextActive = newWindows
      .filter(w => !w.isMinimized)
      .sort((a, b) => b.zIndex - a.zIndex)[0]
    
    return {
      windows: newWindows,
      activeWindow: nextActive?.id || null
    }
  }),
  
  restoreWindow: (id) => set((state) => {
    const maxZ = Math.max(...state.windows.map(w => w.zIndex), state.nextZIndex - 1)
    return {
      windows: state.windows.map(w => 
        w.id === id ? { ...w, isMinimized: false, isRestoring: true, zIndex: maxZ + 1 } : w
      ),
      activeWindow: id,
      nextZIndex: maxZ + 2
    }
  }),
  
  // Clear restoring state after animation
  completeRestore: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { ...w, isRestoring: false } : w
    )
  })),
  
  toggleMaximizeWindow: (id) => set((state) => ({
    windows: state.windows.map(w => {
      if (w.id === id) {
        // Save current position if not maximized
        if (!w.isMaximized) {
          return { 
            ...w, 
            isMaximized: true,
            restoreX: w.x,
            restoreY: w.y,
            restoreWidth: w.width,
            restoreHeight: w.height
          }
        }
        // Restoring from maximized - enforce boundaries on restore position
        const { x: clampedX, y: clampedY } = enforceWindowBoundaries(
          w.restoreX, w.restoreY, w.restoreWidth, w.restoreHeight, `restore[${id}]`
        )
        return { 
          ...w, 
          isMaximized: false,
          x: clampedX,
          y: clampedY,
          width: w.restoreWidth,
          height: w.restoreHeight
        }
      }
      return w
    })
  })),
  
  toggleFullscreenWindow: (id) => set((state) => ({
    windows: state.windows.map(w => {
      if (w.id === id) {
        // Save current position if not fullscreen
        if (!w.isFullscreen) {
          return { 
            ...w, 
            isFullscreen: true,
            restoreX: w.x,
            restoreY: w.y,
            restoreWidth: w.width,
            restoreHeight: w.height,
            isMaximized: false
          }
        }
        return { ...w, isFullscreen: false }
      }
      return w
    })
  })),
  
  updateWindowPosition: (id, x, y) => set((state) => {
    const window = state.windows.find(w => w.id === id)
    if (!window || window.isMaximized || window.isFullscreen) {
      return { windows: state.windows }
    }
    
    // Enforce boundaries - clamp to workspace
    const { x: clampedX, y: clampedY } = enforceWindowBoundaries(
      x, y, window.width, window.height, `updatePosition[${id}]`
    )
    
    return {
      windows: state.windows.map(w => 
        w.id === id ? { ...w, x: clampedX, y: clampedY } : w
      )
    }
  }),
  
  updateWindowSize: (id, width, height) => set((state) => {
    const window = state.windows.find(w => w.id === id)
    if (!window || window.isMaximized || window.isFullscreen) {
      return { windows: state.windows }
    }
    
    // When size changes, position might need adjustment to stay in bounds
    const { x: clampedX, y: clampedY } = enforceWindowBoundaries(
      window.x, window.y, width, height, `updateSize[${id}]`
    )
    
    return {
      windows: state.windows.map(w => 
        w.id === id ? { ...w, width, height, x: clampedX, y: clampedY } : w
      )
    }
  }),
  
  snapWindowLeft: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { 
        ...w, 
        x: 0, 
        y: 0, 
        width: window.innerWidth / 2, 
        height: window.innerHeight - TASKBAR_HEIGHT,
        isMaximized: false,
        isFullscreen: false
      } : w
    )
  })),
  
  snapWindowRight: (id) => set((state) => ({
    windows: state.windows.map(w => 
      w.id === id ? { 
        ...w, 
        x: window.innerWidth / 2, 
        y: 0, 
        width: window.innerWidth / 2, 
        height: window.innerHeight - TASKBAR_HEIGHT,
        isMaximized: false,
        isFullscreen: false
      } : w
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
  
  // Desktop view settings
  iconSize: 'medium', // 'small' | 'medium' | 'large'
  setIconSize: (size) => set({ iconSize: size }),
  
  iconSort: 'name', // 'name' | 'size' | 'type' | 'date'
  setIconSort: (sort) => set({ iconSort: sort }),
  
  showDesktopIcons: true,
  setShowDesktopIcons: (show) => set({ showDesktopIcons: show }),
  
  autoArrangeIcons: true,
  setAutoArrangeIcons: (enabled) => set({ autoArrangeIcons: enabled }),
  
  alignToGrid: true,
  setAlignToGrid: (enabled) => set({ alignToGrid: enabled }),
  
  // Desktop icon selection
  selectedIcons: [],
  setSelectedIcons: (icons) => set({ selectedIcons: icons }),
  clearSelectedIcons: () => set({ selectedIcons: [] }),
  
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
  
  // Notifications
  notifications: [
    {
      id: 'welcome',
      title: 'Welcome to Windows 11 Portfolio',
      message: 'Explore my projects, skills, and experience through this interactive desktop.',
      icon: '👋',
      type: 'info',
      time: 'Just now',
      read: false
    },
    {
      id: 'terminal-tip',
      title: 'Terminal Pro Tip',
      message: 'Try typing "contact", "projects", "skills", or "resume" in the Terminal app!',
      icon: '💡',
      type: 'success',
      time: '2 min ago',
      read: false
    },
    {
      id: 'dark-mode',
      title: 'Dark Mode Available',
      message: 'Toggle between light and dark themes using Quick Settings (bottom-right).',
      icon: '🌙',
      type: 'info',
      time: '5 min ago',
      read: true
    }
  ],
  
  addNotification: (notification) => set((state) => ({
    notifications: [{
      id: `notif-${Date.now()}`,
      read: false,
      time: 'Just now',
      ...notification
    }, ...state.notifications]
  })),
  
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
  })),
  
  clearAllNotifications: () => set({ notifications: [] }),
  
  // Wallpaper management
  currentWallpaper: 'windows-default',
  setCurrentWallpaper: (id) => set({ currentWallpaper: id }),
}),
{
  name: 'portfolio-storage',
  partialize: (state) => ({
    // Persist user preferences
    darkMode: state.darkMode,
    currentWallpaper: state.currentWallpaper,
    
    // Persist desktop customization
    iconPositions: state.iconPositions,
    iconSize: state.iconSize,
    iconSort: state.iconSort,
    showDesktopIcons: state.showDesktopIcons,
    autoArrangeIcons: state.autoArrangeIcons,
    alignToGrid: state.alignToGrid,
    
    // Persist window positions (but not active state or animations)  
    windows: state.windows?.map(window => ({
      id: window.id,
      x: window.x,
      y: window.y,
      width: window.width,
      height: window.height,
      isMaximized: window.isMaximized,
      isMinimized: window.isMinimized
    })) || []
  }),
  
  // Migration function for future state structure changes
  migrate: (persistedState, version) => {
    // Handle version migrations here if needed
    return persistedState
  },
  
  // Only persist after user interactions (not initial loads)
  skipHydration: false,
}
))
