import React, { useState, useEffect } from 'react';

const RecordingsListPage = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/recordings`);
      
      if (response.ok) {
        const data = await response.json();
        setRecordings(data);
      } else {
        throw new Error('Failed to fetch recordings');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recordings:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getVideoStreamUrl = (recordingId) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    return `${apiUrl}/api/recordings/${recordingId}`;
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2>Recordings List</h2>
        <p>Loading recordings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h2>Recordings List</h2>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button 
          onClick={fetchRecordings}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Recordings List</h2>
      
      <button 
        onClick={fetchRecordings}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        Refresh List
      </button>

      {recordings.length === 0 ? (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <p>No recordings found. Go to the Record Screen page to create your first recording!</p>
        </div>
      ) : (
        <div style={{ margin: '2rem 0', textAlign: 'left' }}>
          {recordings.map((recording) => (
            <div 
              key={recording.id} 
              style={{ 
                padding: '1.5rem', 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                margin: '1rem 0',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <strong>{recording.filename}</strong>
                <br />
                <small style={{ color: '#666' }}>
                  Uploaded: {formatDate(recording.uploadDate)} | Size: {formatFileSize(recording.size)}
                </small>
              </div>

              <div style={{ margin: '1rem 0' }}>
                <video 
                  controls 
                  width="400"
                  style={{ maxWidth: '100%', height: 'auto' }}
                >
                  <source src={getVideoStreamUrl(recording.id)} type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <a 
                  href={getVideoStreamUrl(recording.id)}
                  download={recording.filename}
                  style={{ 
                    padding: '8px 16px', 
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
                  onClick={() => window.open(getVideoStreamUrl(recording.id), '_blank')}
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }}
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordingsListPage;
