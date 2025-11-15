import { useState, useRef, useEffect } from 'react'

export default function Camera() {
  const [isRecording, setIsRecording] = useState(false)
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [activeMode, setActiveMode] = useState('photo') // 'photo' or 'video'
  const [countdown, setCountdown] = useState(null)
  const [flashEffect, setFlashEffect] = useState(false)
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  // Initialize camera on mount
  useEffect(() => {
    const enableCamera = async () => {
      try {
        setCameraError(null)
        console.log('🎥 Requesting camera access...')
        
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })

        console.log('✅ Camera stream obtained:', stream)
        console.log('📹 Video tracks:', stream.getVideoTracks())
        streamRef.current = stream

        if (videoRef.current) {
          console.log('📺 Setting video srcObject')
          videoRef.current.srcObject = stream
          
          // Set a small timeout to ensure the video element is ready
          setTimeout(async () => {
            if (videoRef.current && videoRef.current.readyState >= 2) {
              console.log('✅ Video ready, activating camera')
              setCameraActive(true)
            } else {
              console.log('⏳ Waiting for loadedmetadata event')
              videoRef.current.onloadedmetadata = () => {
                console.log('✅ Metadata loaded, activating camera')
                setCameraActive(true)
              }
            }
          }, 100)
        }
      } catch (err) {
        console.error('❌ Error accessing camera:', err)
        setCameraError('Unable to access camera. Please ensure camera permissions are granted.')
      }
    }

    enableCamera()

    return () => {
      // Cleanup: stop camera when component unmounts
      console.log('🛑 Stopping camera')
      const stream = streamRef.current
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      setCameraError(null)
      console.log('🔄 Retrying camera access...')
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
      
      console.log('✅ Camera stream obtained on retry')
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        
        // Set a small timeout to ensure the video element is ready
        setTimeout(() => {
          if (videoRef.current && videoRef.current.readyState >= 2) {
            console.log('✅ Video ready on retry, activating camera')
            setCameraActive(true)
          } else {
            console.log('⏳ Waiting for loadedmetadata event on retry')
            videoRef.current.onloadedmetadata = () => {
              console.log('✅ Metadata loaded on retry, activating camera')
              setCameraActive(true)
            }
          }
        }, 100)
      }
    } catch (error) {
      console.error('❌ Error accessing camera on retry:', error)
      setCameraError('Unable to access camera. Please ensure camera permissions are granted.')
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    // Check if video dimensions are valid
    if (canvas.width === 0 || canvas.height === 0) {
      console.error('Video not ready for capture')
      return
    }
    
    // Draw the current video frame to canvas (unflip the mirrored video)
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.scale(-1, 1) // Flip horizontally to correct the mirror effect
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
    ctx.restore()
    
    // Convert to data URL
    const photoData = canvas.toDataURL('image/png')
    
    // Add to captured photos with timestamp
    const newPhoto = {
      id: Date.now(),
      data: photoData,
      timestamp: new Date().toLocaleString()
    }
    
    setCapturedPhotos(prev => [newPhoto, ...prev])
    
    // Flash effect
    setFlashEffect(true)
    setTimeout(() => setFlashEffect(false), 200)
    
    // Play shutter sound effect (optional - simulated)
    playShutterSound()
  }

  const captureWithTimer = (seconds) => {
    setCountdown(seconds)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          capturePhoto()
          return null
        }
        return prev - 1
      })
    }, 1000)
  }

  const playShutterSound = () => {
    // Simulate camera shutter sound with Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    gainNode.gain.value = 0.1
    
    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const deletePhoto = (photoId) => {
    setCapturedPhotos(prev => prev.filter(photo => photo.id !== photoId))
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null)
    }
  }

  const downloadPhoto = (photo) => {
    const link = document.createElement('a')
    link.href = photo.data
    link.download = `photo_${photo.id}.png`
    link.click()
  }

  return (
    <div className="w-full h-full flex flex-col bg-black">
      {/* Top Toolbar */}
      <div className="h-12 bg-gray-900/90 backdrop-blur-sm flex items-center justify-between px-4 select-none">
        {/* Left Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex bg-gray-800 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveMode('photo')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                activeMode === 'photo' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              📷 Photo
            </button>
            <button
              onClick={() => setActiveMode('video')}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${
                activeMode === 'video' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              🎥 Video
            </button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCapturedPhotos([])}
            className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded transition-colors"
            disabled={capturedPhotos.length === 0}
          >
            🗑️ Clear All
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Camera Preview */}
        <div className="flex-1 relative flex items-center justify-center bg-black">
          {cameraError ? (
            <div className="text-center text-white p-8">
              <div className="text-6xl mb-4">📷</div>
              <div className="text-xl mb-4">Camera Not Available</div>
              <div className="text-sm text-gray-400 mb-6">{cameraError}</div>
              <button
                onClick={startCamera}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {/* Video Stream - Always rendered */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ 
                  transform: 'scaleX(-1)',
                  display: cameraActive ? 'block' : 'none'
                }}
              />
              
              {/* Loading overlay */}
              {!cameraActive && (
                <div className="text-center text-white absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-6xl mb-4">📷</div>
                    <div className="text-xl">Starting camera...</div>
                  </div>
                </div>
              )}
              
              {/* Canvas for capturing (hidden) */}
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Flash Effect */}
              {flashEffect && (
                <div className="absolute inset-0 bg-white pointer-events-none animate-flash" />
              )}
              
              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="text-white text-9xl font-bold animate-pulse">
                    {countdown}
                  </div>
                </div>
              )}
              
              {/* Camera Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex items-center justify-center gap-6">
                  {/* Timer Options */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => captureWithTimer(3)}
                      className="w-10 h-10 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full flex items-center justify-center text-sm transition-colors"
                      title="3 second timer"
                    >
                      3s
                    </button>
                    <button
                      onClick={() => captureWithTimer(10)}
                      className="w-10 h-10 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full flex items-center justify-center text-sm transition-colors"
                      title="10 second timer"
                    >
                      10s
                    </button>
                  </div>

                  {/* Capture Button */}
                  {activeMode === 'photo' ? (
                    <button
                      onClick={capturePhoto}
                      disabled={countdown !== null}
                      className="w-16 h-16 bg-white hover:bg-gray-200 active:scale-95 rounded-full border-4 border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      title="Take photo"
                    >
                      <div className="w-full h-full bg-white rounded-full" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-16 h-16 rounded-full border-4 transition-all shadow-lg ${
                        isRecording
                          ? 'border-red-600 bg-red-600'
                          : 'border-red-600 bg-white hover:bg-gray-200'
                      }`}
                      title={isRecording ? 'Stop recording' : 'Start recording'}
                    >
                      <div className={`w-full h-full transition-all ${
                        isRecording ? 'bg-red-600 rounded-sm scale-50' : 'bg-red-600 rounded-full'
                      }`} />
                    </button>
                  )}

                  {/* Gallery Button */}
                  <button
                    onClick={() => setSelectedPhoto(capturedPhotos[0] || null)}
                    className="w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-lg overflow-hidden transition-colors border border-gray-600"
                    disabled={capturedPhotos.length === 0}
                    title="View gallery"
                  >
                    {capturedPhotos.length > 0 ? (
                      <img src={capturedPhotos[0].data} alt="Latest" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-lg">🖼️</span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Photo Gallery Sidebar */}
        {capturedPhotos.length > 0 && !selectedPhoto && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-white font-medium mb-4">Recent Photos ({capturedPhotos.length})</h3>
              <div className="space-y-3">
                {capturedPhotos.map(photo => (
                  <div
                    key={photo.id}
                    className="group relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <img
                      src={photo.data}
                      alt={`Photo ${photo.id}`}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadPhoto(photo)
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deletePhoto(photo.id)
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-gray-400">{photo.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Photo Viewer */}
        {selectedPhoto && (
          <div className="absolute inset-0 bg-black z-50 flex flex-col">
            {/* Viewer Toolbar */}
            <div className="h-12 bg-gray-900/90 backdrop-blur-sm flex items-center justify-between px-4">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-1.5 text-white hover:bg-gray-800 rounded transition-colors flex items-center gap-2"
              >
                ← Back
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadPhoto(selectedPhoto)}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  💾 Save
                </button>
                <button
                  onClick={() => deletePhoto(selectedPhoto.id)}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
            
            {/* Photo Display */}
            <div className="flex-1 flex items-center justify-center p-4">
              <img
                src={selectedPhoto.data}
                alt="Selected"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Photo Info */}
            <div className="h-16 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center">
              <p className="text-gray-400 text-sm">{selectedPhoto.timestamp}</p>
            </div>
          </div>
        )}
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute top-16 right-4 bg-red-600 text-white px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full" />
          <span className="text-sm font-medium">Recording</span>
        </div>
      )}
    </div>
  )
}
