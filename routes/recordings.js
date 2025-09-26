import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

// Create Express Router instance
const router = express.Router();

// GridFS Storage Engine - using db connection instead of URL
const storage = new GridFsStorage({
  db: mongoose.connection,
  file: (req, file) => {
    return {
      bucketName: 'recordings',
      filename: `recording-${Date.now()}-${file.originalname}`
    };
  }
});

// Multer Middleware
const upload = multer({ storage });

// API Routes

// POST /api/recordings - Upload video
router.post('/', upload.single('video'), async (req, res) => {
  try {
    if (req.file) {
      res.status(201).json({
        message: 'Video uploaded successfully',
        file: {
          id: req.file.id,
          filename: req.file.filename,
          originalname: req.file.originalname,
          size: req.file.size,
          uploadDate: new Date()
        }
      });
    } else {
      res.status(400).json({ error: 'No video file provided' });
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

// GET /api/recordings - List all recordings
router.get('/', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const files = await db.collection('recordings.files').find({}).toArray();
    
    if (files && files.length > 0) {
      const recordings = files.map(file => ({
        id: file._id,
        filename: file.filename,
        originalname: file.metadata?.originalname || file.filename,
        size: file.length,
        uploadDate: file.uploadDate,
        contentType: file.contentType
      }));
      
      res.json(recordings);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error fetching recordings:', error);
    res.status(500).json({ error: 'Failed to fetch recordings' });
  }
});

// GET /api/recordings/:id - Stream video
router.get('/:id', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const { GridFSBucket } = mongoose.mongo;
    
    // Create GridFSBucket instance
    const bucket = new GridFSBucket(db, { bucketName: 'recordings' });
    
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    
    // Find the file
    const files = await db.collection('recordings.files').find({ _id: fileId }).toArray();
    
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'Recording not found' });
    }
    
    const file = files[0];
    
    // Set response headers for video streaming
    res.set({
      'Content-Type': file.contentType || 'video/webm',
      'Content-Length': file.length,
      'Accept-Ranges': 'bytes'
    });
    
    // Create download stream and pipe to response
    const downloadStream = bucket.openDownloadStream(fileId);
    
    downloadStream.on('error', (error) => {
      console.error('Stream error:', error);
      res.status(500).json({ error: 'Failed to stream video' });
    });
    
    downloadStream.pipe(res);
    
  } catch (error) {
    console.error('Streaming error:', error);
    res.status(500).json({ error: 'Failed to stream video' });
  }
});

export default router;
