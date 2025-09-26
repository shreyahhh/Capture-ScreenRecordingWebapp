# 🎥 Capture Screen Recorder - Full Stack Web Application

A professional-grade screen recording web application built with modern technologies. Record your screen, save recordings locally, and upload them to the cloud with a beautiful, intuitive interface.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shreyahhh/Capture-ScreenRecordingWebapp.git
   cd Capture-ScreenRecordingWebapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env` to `.env.local`
   - Update MongoDB connection string in `.env`
   - Set frontend API URL in `.env.local`

4. **Run the application**
   
   **Backend Server (Terminal 1):**
   ```bash
   node server.js
   ```
   Server will start on: http://localhost:8080

   **Frontend Server (Terminal 2):**
   ```bash
   npx next dev -p 3001
   ```
   Frontend will start on: http://localhost:3001

5. **Access the application**
   - Open your browser to http://localhost:3001
   - Start recording your screen!

### Environment Configuration

**Backend (.env):**
```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/screen-recorder
NODE_ENV=development
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 📋 Project Status

✅ **Complete Full-Stack Implementation**
- Backend API with MongoDB GridFS storage
- Next.js frontend with modern UI components
- Screen recording with MediaRecorder API
- File upload/download functionality
- Real-time recording timer
- Professional responsive design

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Professional component library
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **GridFS** - File storage system
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

### APIs & Features
- **MediaRecorder API** - Screen/audio recording
- **Screen Capture API** - Display media access
- **File API** - Blob handling and downloads
- **Fetch API** - HTTP requests

## 📁 Project Structure

```
Capture-ScreenRecorder/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   ├── ScreenRecorder.tsx # Recording functionality
│   ├── RecordingsList.tsx # Recordings management
│   └── DocumentationDialog.tsx # Tech docs
├── lib/                  # Utility functions
├── routes/               # Express API routes
├── server.js             # Express server
├── .env                  # Backend configuration
├── .env.local            # Frontend configuration
└── README.md             # Project documentation
```

## 🚀 Git Repository Setup

The project is ready to be pushed to GitHub. To complete the setup:

1. **Create GitHub Repository** (if not done):
   ```bash
   # Repository URL: https://github.com/shreyahhh/Capture-ScreenRecordingWebapp
   ```

2. **Authentication Setup**:
   - Use GitHub Personal Access Token for authentication
   - Or set up SSH keys for secure access

3. **Push Code**:
   ```bash
   git remote add origin https://github.com/shreyahhh/Capture-ScreenRecordingWebapp.git
   git branch -M main
   git push -u origin main
   ```

## ⚡ Quick Development Commands

```bash
# Install all dependencies
npm install

# Start backend server
node server.js

# Start frontend (in new terminal)
npx next dev -p 3001

# Build for production
npm run build

# View recordings API
curl http://localhost:8080/api/recordings
```

## 🚀 Features

### ✅ Core Functionality
- **🎬 Screen Recording**: Full screen capture with system audio
- **⏱️ Live Timer**: Real-time recording duration display (MM:SS format)
- **📹 Instant Preview**: Video playback immediately after recording
- **💾 Local Download**: Save recordings directly to your device
- **☁️ Cloud Upload**: Upload recordings to MongoDB GridFS storage
- **📋 Recordings Library**: View, play, and manage all uploaded recordings
- **🎯 Status Indicators**: Real-time upload progress and status feedback
- **📱 Responsive Design**: Works on desktop and mobile devices

### 🔧 Technical Features
- **GridFS Storage**: Efficient video file storage in MongoDB
- **RESTful API**: Clean API endpoints for video management
- **CORS Configuration**: Proper cross-origin resource sharing
- **Environment Configuration**: Secure environment variable management
- **Error Handling**: Comprehensive error handling and user feedback
- **Hot Module Replacement**: Fast development with Vite

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account) - [Get MongoDB](https://www.mongodb.com/)
- **Modern Web Browser** (Chrome, Firefox, Edge - Safari has limited support)

## 🛠️ Installation & Setup

### 1. Clone or Download the Project
```bash
# If you have git
git clone <repository-url>
cd Capture-ScreenRecorder

# Or download and extract the ZIP file
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=8080

# Database Configuration (Choose one option below)

# Option A: MongoDB Atlas (Recommended for production)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/capture-screenrecorder?retryWrites=true&w=majority

# Option B: Local MongoDB (For development)
# MONGO_URI=mongodb://localhost:27017/capture-screenrecorder

# Frontend Configuration
FRONTEND_URL=http://localhost:3000
```

Create a `.env.local` file for frontend environment variables:

```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:8080
```

### 4. Database Setup

#### Option A: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create database user with read/write permissions
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and update `MONGO_URI` in `.env`

#### Option B: Local MongoDB
1. Install MongoDB Community Server
2. Start MongoDB service
3. Use the local connection string in `.env`

## 🚀 Running the Application

### Development Mode (Recommended)
```bash
# Start both backend and frontend simultaneously
npm run dev:full

# Or start them separately:
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend  
npm run frontend
```

### Production Mode
```bash
# Build frontend
npm run build

# Start backend only
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Test Endpoint**: http://localhost:8080/api/test

## 📖 How to Use

### 1. Record Your Screen
1. Navigate to http://localhost:3000
2. Click "Start Recording"
3. Select the screen/window you want to record
4. Grant microphone permissions (optional)
5. Click "Stop Recording" when finished

### 2. Preview & Save
1. View your recording in the built-in video player
2. Download the video file locally using the "Download" button
3. Upload to server using the "Upload to Server" button

### 3. Manage Recordings
1. Click "View Recordings" in the navigation
2. See all uploaded recordings with details
3. Play videos directly in the browser
4. Download recordings from the cloud

## 🏗️ Project Structure

```
Capture-ScreenRecorder/
├── 📁 src/                          # Frontend React source
│   ├── 📁 pages/                    # React pages/components
│   │   ├── RecorderPage.jsx         # Main recording interface
│   │   └── RecordingsListPage.jsx   # Recordings management
│   ├── App.jsx                      # Main App component with routing
│   ├── main.jsx                     # React app entry point
│   └── index.css                    # Styles
├── 📁 routes/                       # Backend API routes
│   └── recordings.js                # Video upload/streaming endpoints
├── 📁 node_modules/                 # Dependencies
├── server.js                        # Express.js backend server
├── package.json                     # Dependencies and scripts
├── vite.config.js                   # Vite frontend build config
├── index.html                       # Frontend HTML template
├── .env                            # Backend environment variables
├── .env.local                      # Frontend environment variables
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## 🔗 API Endpoints

### Test Endpoint
- **GET** `/api/test`
  - **Description**: Health check endpoint
  - **Response**: `{ message: "Backend API is running successfully!" }`

### Recordings Management
- **POST** `/api/recordings`
  - **Description**: Upload a new video recording
  - **Body**: FormData with 'video' file
  - **Response**: Upload confirmation with file details

- **GET** `/api/recordings`
  - **Description**: Get list of all recordings
  - **Response**: Array of recording metadata

- **GET** `/api/recordings/:id`
  - **Description**: Stream/download specific recording
  - **Response**: Video file stream

## 📦 Dependencies

### Backend Dependencies
- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable loader
- **multer**: File upload handling
- **multer-gridfs-storage**: GridFS storage engine for multer

### Frontend Dependencies
- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **vite**: Fast build tool and development server

### Development Dependencies
- **nodemon**: Auto-restart development server
- **concurrently**: Run multiple commands simultaneously

## 🎯 Stretch Goals Analysis

### ✅ Implemented Features (4/4)
1. **✅ Safari Compatibility**: 
   - Added feature detection for `getDisplayMedia`
   - Graceful fallback messages for unsupported browsers
   - MediaRecorder API compatibility checks

2. **✅ Pause/Resume Controls**:
   - MediaRecorder pause/resume functionality
   - UI controls for pausing and resuming recordings
   - Timer pause/resume synchronization

3. **✅ File Validation**:
   - File size validation before upload
   - Duration validation and display
   - MIME type validation for video files

4. **🔄 Basic Authentication** (Partially Implemented):
   - Backend routes prepared for authentication middleware
   - Frontend ready for token-based auth integration
   - *Note: Full implementation requires additional auth setup*

## 🌍 Browser Compatibility

| Browser | Screen Recording | Audio Capture | Video Upload | Notes |
|---------|------------------|---------------|--------------|--------|
| Chrome ✅ | Full Support | ✅ | ✅ | Recommended browser |
| Firefox ✅ | Full Support | ✅ | ✅ | Full compatibility |
| Edge ✅ | Full Support | ✅ | ✅ | Full compatibility |
| Safari ⚠️ | Limited | ⚠️ | ✅ | Partial support, fallback messages |

## ⚠️ Known Limitations

1. **Safari Support**: Limited screen recording capabilities due to WebRTC restrictions
2. **Mobile Recording**: Screen recording not supported on most mobile browsers
3. **File Size**: Large recordings may take time to upload depending on connection
4. **Audio Quality**: Audio quality depends on system audio settings
5. **Browser Permissions**: Requires user permission for screen capture and microphone access

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot connect to backend"**
   - Ensure backend server is running on port 8080
   - Check `VITE_API_URL` in `.env.local`

2. **"Database connection failed"**
   - Verify MongoDB connection string in `.env`
   - Check network connectivity for MongoDB Atlas

3. **"Screen recording not supported"**
   - Use Chrome, Firefox, or Edge browsers
   - Ensure HTTPS in production (required for screen capture)

4. **Upload fails**
   - Check file size (ensure it's reasonable)
   - Verify backend server is running
   - Check browser developer console for errors

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Railway/Heroku)
- Set environment variables in deployment platform
- Ensure MongoDB Atlas connection string is correct
- Update CORS settings for production domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♂️ Support

## 🔧 Troubleshooting

### Common Issues & Solutions

#### "Failed to fetch" Error
- **Issue**: Frontend can't connect to backend API
- **Solution**: 
  ```bash
  # Ensure backend is running on port 8080
  node server.js
  
  # Check environment variable in .env.local
  NEXT_PUBLIC_API_URL=http://localhost:8080
  ```

#### Port Already in Use
- **Issue**: `EADDRINUSE` error when starting servers
- **Solution**:
  ```bash
  # Kill process on specific port (Windows)
  netstat -ano | findstr :8080
  taskkill /PID [PID_NUMBER] /F
  
  # Or use different ports
  node server.js -p 8081
  npx next dev -p 3002
  ```

#### MongoDB Connection Error
- **Issue**: Cannot connect to MongoDB
- **Solution**:
  ```bash
  # Ensure MongoDB is running locally
  mongod
  
  # Or use MongoDB Atlas cloud URL in .env
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
  ```

### Development Tips

1. **Always run both servers**: Backend (port 8080) + Frontend (port 3001)
2. **Check browser console**: Look for JavaScript errors and network issues
3. **Verify environment variables**: Ensure API URLs match running servers
4. **Use developer tools**: Monitor network requests and responses

---

**Built with 💻 using Modern Web Technologies** | **⭐ Star this repo if you found it helpful!**

*This project demonstrates modern full-stack development with real-time media handling, cloud storage, and professional UI design.*
