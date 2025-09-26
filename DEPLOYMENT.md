# 🚀 Deployment Guide

## Backend Deployment on Render

### Step 1: Prepare MongoDB Atlas
1. Create MongoDB Atlas account: https://cloud.mongodb.com
2. Create new cluster (free tier available)
3. Create database user with read/write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for production
5. Copy connection string

### Step 2: Deploy to Render
1. Create Render account: https://render.com
2. Connect your GitHub repository
3. Create new "Web Service"
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Node Version**: 18 or higher

### Step 3: Environment Variables (Render)
Add these in Render dashboard:
```
PORT=8080
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/screen-recorder
CORS_ORIGIN=https://your-app-name.vercel.app
```

## Frontend Deployment on Vercel

### Step 1: Deploy to Vercel
1. Create Vercel account: https://vercel.com
2. Import GitHub repository
3. Framework will auto-detect as Next.js
4. Deploy!

### Step 2: Environment Variables (Vercel)
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
```

### Step 3: Update CORS
After frontend deployment, update the CORS_ORIGIN in Render with your Vercel URL.

## Quick Deploy Commands

```bash
# Build and test locally first
npm run build
npm start

# Push changes to trigger auto-deployment
git add .
git commit -m "Production deployment"
git push origin main

# Frontend will auto-deploy on Vercel
# Backend will auto-deploy on Render
```

## Post-Deployment Checklist

- [ ] Backend health check: `https://your-backend.onrender.com/api/test`
- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] MongoDB connection works
- [ ] CORS configuration allows frontend requests
- [ ] File upload functionality works
- [ ] Recording playback works

## Troubleshooting

### Common Issues:
1. **CORS errors**: Update CORS_ORIGIN in backend
2. **API not found**: Check NEXT_PUBLIC_API_URL in frontend
3. **MongoDB connection**: Verify connection string and IP whitelist
4. **Cold starts**: Render free tier has cold starts (~30s delay)

## Production URLs
- **Backend**: https://your-app-name.onrender.com
- **Frontend**: https://your-app-name.vercel.app
