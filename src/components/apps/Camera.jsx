import { useState, useRef, useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Camera() {
  const [isRecording, setIsRecording] = useState(false)
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [recordedVideos, setRecordedVideos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [cameraLoading, setCameraLoading] = useState(true)
  const [activeMode, setActiveMode] = useState('photo') // 'photo' or 'video'
  const [countdown, setCountdown] = useState(null)
  const [flashEffect, setFlashEffect] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const recordedChunksRef = useRef([])
  const recordingTimerRef = useRef(null)

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
                setCameraLoading(false)
              }
            }
          }, 100)
        }
      } catch (err) {
        console.error('❌ Error accessing camera:', err)
        setCameraError('Unable to access camera. Please ensure camera permissions are granted.')
        setCameraLoading(false)
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

  // Video recording functions
  const startRecording = async () => {
    if (!streamRef.current) return

    try {
      recordedChunksRef.current = []
      
      const options = {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 2500000
      }

      // Fallback for browsers that don't support vp9
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'video/webm'
      }

      const mediaRecorder = new MediaRecorder(streamRef.current, options)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: 'video/webm'
        })
        const videoURL = URL.createObjectURL(blob)

        const newVideo = {
          id: Date.now(),
          data: videoURL,
          blob: blob,
          timestamp: new Date().toLocaleString(),
          duration: recordingDuration
        }

        setRecordedVideos(prev => [newVideo, ...prev])
        setRecordingDuration(0)
        
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current)
          recordingTimerRef.current = null
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingDuration(0)

      // Start duration timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    } catch (error) {
      console.error('Error starting recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const deleteVideo = (videoId) => {
    setRecordedVideos(prev => prev.filter(video => video.id !== videoId))
    if (selectedVideo?.id === videoId) {
      setSelectedVideo(null)
    }
  }

  const downloadVideo = (video) => {
    const link = document.createElement('a')
    link.href = video.data
    link.download = `video_${video.id}.webm`
    link.click()
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Cleanup recording timer on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full h-full flex flex-col bg-black">
      {/* Loading State */}
      {cameraLoading && !cameraError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <LoadingSpinner size="lg" message="Initializing camera..." className="text-white" />
        </div>
      )}
      
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
                      onClick={toggleRecording}
                      className={`w-16 h-16 rounded-full border-4 transition-all shadow-lg ${
                        isRecording
                          ? 'border-red-600 bg-red-600'
                          : 'border-red-600 bg-white hover:bg-gray-200'
                      }`}
                      title={isRecording ? 'Stop recording' : 'Start recording'}
                    >
                      <div className={`w-full h-full transition-all ${
                        isRecording ? 'bg-white rounded-sm scale-50' : 'bg-red-600 rounded-full'
                      }`} />
                    </button>
                  )}

                  {/* Gallery Button */}
                  <button
                    onClick={() => {
                      if (activeMode === 'photo') {
                        setSelectedPhoto(capturedPhotos[0] || null)
                      } else {
                        setSelectedVideo(recordedVideos[0] || null)
                      }
                    }}
                    className="w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-lg overflow-hidden transition-colors border border-gray-600"
                    disabled={activeMode === 'photo' ? capturedPhotos.length === 0 : recordedVideos.length === 0}
                    title="View gallery"
                  >
                    {activeMode === 'photo' && capturedPhotos.length > 0 ? (
                      <img src={capturedPhotos[0].data} alt="Latest" className="w-full h-full object-cover" />
                    ) : activeMode === 'video' && recordedVideos.length > 0 ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <span className="text-white text-xl">▶️</span>
                      </div>
                    ) : (
                      <span className="text-white text-lg">🖼️</span>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Photo/Video Gallery Sidebar */}
        {activeMode === 'photo' && capturedPhotos.length > 0 && !selectedPhoto && !selectedVideo && (
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

        {/* Video Gallery Sidebar */}
        {activeMode === 'video' && recordedVideos.length > 0 && !selectedPhoto && !selectedVideo && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-white font-medium mb-4">Recorded Videos ({recordedVideos.length})</h3>
              <div className="space-y-3">
                {recordedVideos.map(video => (
                  <div
                    key={video.id}
                    className="group relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="w-full h-40 bg-gray-700 flex items-center justify-center">
                      <span className="text-6xl">▶️</span>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadVideo(video)
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteVideo(video.id)
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                    <div className="p-2">
                      <p className="text-xs text-gray-400">{video.timestamp}</p>
                      <p className="text-xs text-gray-500">Duration: {formatDuration(video.duration)}</p>
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

        {/* Video Viewer */}
        {selectedVideo && (
          <div className="absolute inset-0 bg-black z-50 flex flex-col">
            {/* Viewer Toolbar */}
            <div className="h-12 bg-gray-900/90 backdrop-blur-sm flex items-center justify-between px-4">
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-4 py-1.5 text-white hover:bg-gray-800 rounded transition-colors flex items-center gap-2"
              >
                ← Back
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadVideo(selectedVideo)}
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  💾 Save
                </button>
                <button
                  onClick={() => deleteVideo(selectedVideo.id)}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
            
            {/* Video Display */}
            <div className="flex-1 flex items-center justify-center p-4">
              <video
                src={selectedVideo.data}
                controls
                autoPlay
                className="max-w-full max-h-full"
              />
            </div>
            
            {/* Video Info */}
            <div className="h-16 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center gap-4">
              <p className="text-gray-400 text-sm">{selectedVideo.timestamp}</p>
              <span className="text-gray-600">•</span>
              <p className="text-gray-400 text-sm">Duration: {formatDuration(selectedVideo.duration)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Recording Indicator with Duration */}
      {isRecording && (
        <div className="absolute top-16 right-4 bg-red-600 text-white px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full" />
          <span className="text-sm font-medium">REC {formatDuration(recordingDuration)}</span>
        </div>
      )}
    </div>
  )
}
