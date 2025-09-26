import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RecorderPage from './pages/RecorderPage';
import RecordingsListPage from './pages/RecordingsListPage';

function App() {
  // API Test - useEffect hook to test backend connection
  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await fetch(`${apiUrl}/api/test`);
        const data = await response.json();
        console.log('Backend connection test result:', data);
      } catch (error) {
        console.error('Backend connection failed:', error);
      }
    };

    testBackendConnection();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {/* Header */}
        <h1>Screen Recorder App</h1>
        
        {/* Navigation */}
        <nav>
          <Link to="/">Record Screen</Link>
          <Link to="/recordings">View Recordings</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<RecorderPage />} />
          <Route path="/recordings" element={<RecordingsListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
