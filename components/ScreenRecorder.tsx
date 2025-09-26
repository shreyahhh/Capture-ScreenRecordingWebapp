"use client"

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Square, Pause, Download, Upload, AlertTriangle } from "lucide-react"

export function ScreenRecorder() {
  // State Management
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [videoURL, setVideoURL] = useState<string | null>(null)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  
  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])

  // Browser compatibility check
  const checkBrowserSupport = () => {
    const isSupported = {
      getDisplayMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia),
      mediaRecorder: !!(window.MediaRecorder),
      getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    }

    return {
      isSupported: isSupported.getDisplayMedia && isSupported.mediaRecorder,
      details: isSupported
    }
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // File validation
  const validateFile = (blob: Blob, duration: number) => {
    const maxSizeInMB = 100
    const maxDurationInSeconds = 600
    const fileSizeInMB = blob.size / (1024 * 1024)

    if (fileSizeInMB > maxSizeInMB) {
      return {
        isValid: false,
        message: `File size (${fileSizeInMB.toFixed(2)}MB) exceeds the maximum limit of ${maxSizeInMB}MB.`
      }
    }

    if (duration > maxDurationInSeconds) {
      return {
        isValid: false,
        message: `Recording duration (${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}) exceeds the maximum limit of ${Math.floor(maxDurationInSeconds/60)} minutes.`
      }
    }

    return { isValid: true }
  }

  // Start Recording
  const handleStartRecording = async () => {
    try {
      const browserSupport = checkBrowserSupport()
      if (!browserSupport.isSupported) {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        const message = isSafari 
          ? 'Screen recording is not fully supported in Safari. Please use Chrome, Firefox, or Edge for the best experience.'
          : 'Your browser does not support screen recording. Please use a modern browser like Chrome, Firefox, or Edge.'
        alert(message)
        return
      }

      // Clear previous data
      setVideoURL(null)
      setVideoBlob(null)
      recordedChunksRef.current = []
      setRecordingTime(0)

      // Request screen capture
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' } as any,
        audio: true
      })

      // Request microphone access (optional)
      let audioStream = null
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      } catch (audioError) {
        console.log('Microphone access denied, continuing with screen audio only')
      }

      // Combine streams
      let combinedStream: MediaStream
      if (audioStream) {
        const audioTrack = audioStream.getAudioTracks()[0]
        combinedStream = new MediaStream([
          ...displayStream.getVideoTracks(),
          ...displayStream.getAudioTracks(),
          audioTrack
        ])
      } else {
        combinedStream = displayStream
      }

      mediaStreamRef.current = combinedStream

      // Create MediaRecorder instance
      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9'
      })
      mediaRecorderRef.current = mediaRecorder

      // Event handlers
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: 'video/webm'
        })
        setVideoBlob(blob)
        const url = URL.createObjectURL(blob)
        setVideoURL(url)
      }

      // Start recording
      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (error) {
      console.error('Error starting recording:', error)
      alert('Failed to start recording. Please make sure you grant screen capture permissions.')
    }
  }

  // Stop Recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }

    setIsRecording(false)
    setIsPaused(false)
  }

  // Pause Recording
  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
      
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
        timerIntervalRef.current = null
      }
    }
  }

  // Resume Recording
  const handleResumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
      
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
  }

  // Upload to Server
  const handleUploadToServer = async () => {
    if (!videoBlob) {
      alert('No video to upload')
      return
    }

    const validation = validateFile(videoBlob, recordingTime)
    if (!validation.isValid) {
      alert(validation.message)
      return
    }

    setUploadStatus('uploading')

    try {
      const formData = new FormData()
      formData.append('video', videoBlob, 'recording.webm')

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
      const response = await fetch(`${apiUrl}/api/recordings`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setUploadStatus('success')
        console.log('Upload successful:', result)
        
        setTimeout(() => {
          setUploadStatus('idle')
        }, 3000)
      } else {
        throw new Error(`Upload failed with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
      
      setTimeout(() => {
        setUploadStatus('idle')
      }, 3000)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const browserSupport = checkBrowserSupport()
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Recording Card */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Record Your Screen</CardTitle>
          <CardDescription>
            Capture your screen with professional-quality recording
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <motion.div 
            className="text-center"
            animate={{ scale: isRecording && !isPaused ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: isRecording && !isPaused ? Infinity : 0 }}
          >
            <div className="text-6xl font-mono font-bold text-primary">
              {formatTime(recordingTime)}
            </div>
          </motion.div>

          {/* Recording Controls */}
          <div className="flex justify-center gap-4">
            {!isRecording ? (
              <Button 
                onClick={handleStartRecording}
                size="lg"
                className="gap-2"
                disabled={!browserSupport.isSupported}
              >
                <Play className="h-5 w-5" />
                Start Recording
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button 
                  onClick={handleStopRecording}
                  size="lg"
                  variant="destructive"
                  className="gap-2"
                >
                  <Square className="h-4 w-4" />
                  Stop Recording
                </Button>
                
                {!isPaused ? (
                  <Button 
                    onClick={handlePauseRecording}
                    size="lg"
                    variant="secondary"
                    className="gap-2"
                  >
                    <Pause className="h-4 w-4" />
                    Pause
                  </Button>
                ) : (
                  <Button 
                    onClick={handleResumeRecording}
                    size="lg"
                    className="gap-2"
                  >
                    <Play className="h-4 w-4" />
                    Resume
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Recording Status */}
          {isRecording && !isPaused && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Recording in progress...
              </div>
            </motion.div>
          )}
          
          {isPaused && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                <Pause className="h-4 w-4" />
                Recording paused
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Browser Compatibility Warning */}
      {!browserSupport.isSupported && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Browser Compatibility Notice</h4>
                  <p className="text-sm text-yellow-700">
                    {isSafari 
                      ? 'Screen recording has limited support in Safari. For the best experience, please use Chrome, Firefox, or Edge.'
                      : 'Your browser does not fully support screen recording. Please use a modern browser like Chrome, Firefox, or Edge.'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Video Preview */}
      {videoURL && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recording Preview</CardTitle>
              <CardDescription>
                Your recording is ready for preview and download
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File Information */}
              {videoBlob && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">File Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Size:</span> {formatFileSize(videoBlob.size)}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {formatTime(recordingTime)}
                    </div>
                    <div>
                      <span className="font-medium">Format:</span> WebM (VP9)
                    </div>
                  </div>
                </div>
              )}

              {/* Video Player */}
              <div className="relative">
                <video 
                  src={videoURL} 
                  controls 
                  className="w-full max-h-96 rounded-lg bg-black"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  asChild
                  variant="outline"
                  className="gap-2"
                >
                  <a href={videoURL} download={`recording-${Date.now()}.webm`}>
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </Button>
                
                <Button 
                  onClick={handleUploadToServer}
                  disabled={uploadStatus === 'uploading'}
                  className="gap-2"
                  variant={
                    uploadStatus === 'success' ? 'default' : 
                    uploadStatus === 'error' ? 'destructive' : 'default'
                  }
                >
                  <Upload className="h-4 w-4" />
                  {uploadStatus === 'uploading' ? 'Uploading...' : 
                   uploadStatus === 'success' ? 'Uploaded!' : 
                   uploadStatus === 'error' ? 'Upload Failed' : 
                   'Upload to Server'}
                </Button>
              </div>

              {/* Upload Status Messages */}
              {uploadStatus === 'uploading' && (
                <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                  Uploading video to server...
                </div>
              )}
              {uploadStatus === 'success' && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  Video uploaded successfully! Check the recordings list to view it.
                </div>
              )}
              {uploadStatus === 'error' && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  Upload failed. Please check your connection and try again.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
