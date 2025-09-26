import React, { useState, useRef, useEffect } from 'react';

const RecorderPage = () => {
  // State Management
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoURL, setVideoURL] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const [isPaused, setIsPaused] = useState(false);

  // Refs
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Feature Detection
  const checkBrowserSupport = () => {
    const isSupported = {
      getDisplayMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia),
      mediaRecorder: !!(window.MediaRecorder),
      getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    };

    return {
      isSupported: isSupported.getDisplayMedia && isSupported.mediaRecorder,
      details: isSupported
    };
  };

  // Core Functions
  const handleStartRecording = async () => {
    try {
      // Browser compatibility check
      const browserSupport = checkBrowserSupport();
      if (!browserSupport.isSupported) {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const message = isSafari 
          ? 'Screen recording is not fully supported in Safari. Please use Chrome, Firefox, or Edge for the best experience.'
          : 'Your browser does not support screen recording. Please use a modern browser like Chrome, Firefox, or Edge.';
        alert(message);
        return;
      }

      // Clear any previous videoURL and videoBlob
      setVideoURL(null);
      setVideoBlob(null);
      recordedChunksRef.current = [];
      setRecordingTime(0);

      // Request screen capture
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' },
        audio: true
      });

      // Request microphone access (optional)
      let audioStream = null;
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (audioError) {
        console.log('Microphone access denied, continuing with screen audio only');
      }

      // Combine streams
      let combinedStream;
      if (audioStream) {
        const audioTrack = audioStream.getAudioTracks()[0];
        combinedStream = new MediaStream([
          ...displayStream.getVideoTracks(),
          ...displayStream.getAudioTracks(),
          audioTrack
        ]);
      } else {
        combinedStream = displayStream;
      }

      // Store stream in ref
      mediaStreamRef.current = combinedStream;

      // Create MediaRecorder instance
      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      mediaRecorderRef.current = mediaRecorder;

      // Define ondataavailable event handler
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      // Define onstop event handler
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: 'video/webm'
        });
        setVideoBlob(blob);
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please make sure you grant screen capture permissions.');
    }
  };

  const handleStopRecording = () => {
    // Stop MediaRecorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    // Stop all tracks
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }

    // Clear timer interval
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setIsRecording(false);
    setIsPaused(false);
  };

  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      
      // Pause timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  };

  const handleResumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume timer
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const validateFile = (blob, duration) => {
    const maxSizeInMB = 100; // 100MB limit
    const maxDurationInSeconds = 600; // 10 minutes limit
    const fileSizeInMB = blob.size / (1024 * 1024);

    if (fileSizeInMB > maxSizeInMB) {
      return {
        isValid: false,
        message: `File size (${fileSizeInMB.toFixed(2)}MB) exceeds the maximum limit of ${maxSizeInMB}MB.`
      };
    }

    if (duration > maxDurationInSeconds) {
      return {
        isValid: false,
        message: `Recording duration (${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}) exceeds the maximum limit of ${Math.floor(maxDurationInSeconds/60)} minutes.`
      };
    }

    return { isValid: true };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUploadToServer = async () => {
    // Check if videoBlob exists in state
    if (!videoBlob) {
      alert('No video to upload');
      return;
    }

    // Validate file size and duration
    const validation = validateFile(videoBlob, recordingTime);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    // Set upload status to 'uploading'
    setUploadStatus('uploading');

    try {
      // Create FormData object
      const formData = new FormData();
      
      // Append videoBlob with key 'video' and filename
      formData.append('video', videoBlob, 'recording.webm');

      // Get API URL from environment variable
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      
      // Send POST request to backend upload endpoint
      const response = await fetch(`${apiUrl}/api/recordings`, {
        method: 'POST',
        body: formData
      });

      // Check if response was successful
      if (response.ok) {
        const result = await response.json();
        setUploadStatus('success');
        console.log('Upload successful:', result);
        
        // Reset upload status after 3 seconds
        setTimeout(() => {
          setUploadStatus('idle');
        }, 3000);
      } else {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      
      // Reset upload status after 3 seconds
      setTimeout(() => {
        setUploadStatus('idle');
      }, 3000);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Lifecycle - Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="page-container">
      <h2>Record Your Screen</h2>
      
      {/* Recording Timer */}
      <div style={{ margin: '1rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {formatTime(recordingTime)}
      </div>

      {/* Recording Buttons */}
      <div style={{ margin: '2rem 0' }}>
        {!isRecording ? (
          <button 
            onClick={handleStartRecording}
            style={{ 
              padding: '12px 24px', 
              fontSize: '16px', 
              backgroundColor: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Start Recording
          </button>
        ) : (
          <>
            <button 
              onClick={handleStopRecording}
              style={{ 
                padding: '12px 24px', 
                fontSize: '16px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Stop Recording
            </button>
            
            {!isPaused ? (
              <button 
                onClick={handlePauseRecording}
                style={{ 
                  padding: '12px 24px', 
                  fontSize: '16px', 
                  backgroundColor: '#ffc107', 
                  color: 'black', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                ⏸️ Pause
              </button>
            ) : (
              <button 
                onClick={handleResumeRecording}
                style={{ 
                  padding: '12px 24px', 
                  fontSize: '16px', 
                  backgroundColor: '#17a2b8', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
              >
                ▶️ Resume
              </button>
            )}
          </>
        )}
      </div>

      {/* Video Preview and Controls */}
      {videoURL && (
        <div style={{ margin: '2rem 0' }}>
          <h3>Recording Preview</h3>
          
          {/* File Information */}
          {videoBlob && (
            <div style={{ 
              margin: '1rem 0', 
              padding: '10px', 
              backgroundColor: '#f8f9fa', 
              border: '1px solid #dee2e6', 
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <strong>File Details:</strong><br />
              📁 Size: {formatFileSize(videoBlob.size)}<br />
              ⏱️ Duration: {formatTime(recordingTime)}<br />
              🎥 Format: WebM (VP9 codec)
            </div>
          )}
          
          <video 
            src={videoURL} 
            controls 
            width="600"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div style={{ margin: '1rem 0' }}>
            <a 
              href={videoURL} 
              download={`recording-${Date.now()}.webm`}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                textDecoration: 'none', 
                borderRadius: '4px',
                marginRight: '10px',
                display: 'inline-block'
              }}
            >
              Download
            </a>
            <button 
              onClick={handleUploadToServer}
              disabled={uploadStatus === 'uploading'}
              style={{ 
                padding: '10px 20px', 
                fontSize: '14px', 
                backgroundColor: uploadStatus === 'uploading' ? '#6c757d' : 
                                uploadStatus === 'success' ? '#28a745' : 
                                uploadStatus === 'error' ? '#dc3545' : '#6f42c1',
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: uploadStatus === 'uploading' ? 'not-allowed' : 'pointer',
                opacity: uploadStatus === 'uploading' ? 0.7 : 1
              }}
            >
              {uploadStatus === 'uploading' ? '⏳ Uploading...' : 
               uploadStatus === 'success' ? '✅ Uploaded!' : 
               uploadStatus === 'error' ? '❌ Upload Failed' : 
               'Upload to Server'}
            </button>
          </div>

          {/* Upload Status Messages */}
          {uploadStatus === 'uploading' && (
            <p style={{ color: '#007bff', fontWeight: 'bold', margin: '1rem 0' }}>
              📤 Uploading video to server...
            </p>
          )}
          {uploadStatus === 'success' && (
            <p style={{ color: '#28a745', fontWeight: 'bold', margin: '1rem 0' }}>
              ✅ Video uploaded successfully! Check the recordings list to view it.
            </p>
          )}
          {uploadStatus === 'error' && (
            <p style={{ color: '#dc3545', fontWeight: 'bold', margin: '1rem 0' }}>
              ❌ Upload failed. Please check your connection and try again.
            </p>
          )}
        </div>
      )}

      {/* Recording Status */}
      {isRecording && !isPaused && (
        <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
          🔴 Recording in progress... Click "Stop Recording" when finished.
        </p>
      )}
      
      {isPaused && (
        <p style={{ color: '#ffc107', fontWeight: 'bold' }}>
          ⏸️ Recording paused. Click "Resume" to continue or "Stop Recording" to finish.
        </p>
      )}
      
      {/* Browser Compatibility Notice */}
      {(() => {
        const browserSupport = checkBrowserSupport();
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        return !browserSupport.isSupported && (
          <div style={{ 
            margin: '2rem 0', 
            padding: '15px', 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '4px', 
            color: '#856404' 
          }}>
            <strong>⚠️ Browser Compatibility Notice:</strong><br />
            {isSafari 
              ? 'Screen recording has limited support in Safari. For the best experience, please use Chrome, Firefox, or Edge.'
              : 'Your browser does not fully support screen recording. Please use a modern browser like Chrome, Firefox, or Edge.'
            }
          </div>
        );
      })()}
    </div>
  );
};

export default RecorderPage;
