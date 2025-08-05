# Vercel + Render Deployment Guide

## 🚀 Deploy Frontend on Vercel & Backend on Render

This guide will help you deploy your Mini LinkedIn app with:
- **Frontend**: Vercel (React)
- **Backend**: Render (Node.js/Express)

---

## 📋 Prerequisites

1. **GitHub Account** - Your code should be on GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Render Account** - Sign up at [render.com](https://render.com)
4. **MongoDB Atlas** - Already configured ✅

---

## 🛠️ Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel + Render deployment"
   git push origin main
   ```

2. **Ensure these files are in your repo:**
   - `client/package.json` ✅
   - `server/package.json` ✅
   - `client/vercel.json` ✅
   - `render.yaml` ✅

---

## 🖥️ Step 2: Deploy Backend on Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Verify your email

### 2.2 Deploy Backend Service
1. **Click "New +" → "Web Service"**
2. **Connect your GitHub repository**
3. **Configure the service:**
   ```
   Name: mini-linkedin-backend
   Environment: Node
   Region: Choose closest to you
   Branch: main
   Build Command: cd server && npm install
   Start Command: cd server && npm start
   ```

### 2.3 Set Environment Variables
In Render dashboard, go to your service → Environment → Add:

```
MONGODB_URI=mongodb+srv://oneaman99:pIajfO0ahfAN3Pb9@cluster0.dy9qeak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
PORT=5000
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait for build to complete (2-3 minutes)
3. **Copy your Render URL** (e.g., `https://mini-linkedin-backend.onrender.com`)

---

## 🌐 Step 3: Deploy Frontend on Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Verify your account

### 3.2 Deploy Frontend
1. **Click "New Project"**
2. **Import your GitHub repository**
3. **Configure the project:**
   ```
   Framework Preset: Create React App
   Root Directory: client
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

### 3.3 Set Environment Variables
In Vercel dashboard, go to your project → Settings → Environment Variables:

```
REACT_APP_API_URL=https://your-render-backend-url.onrender.com
```

### 3.4 Update API Configuration
1. **Get your Render backend URL**
2. **Update `client/vercel.json`:**
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://your-render-backend-url.onrender.com/api/$1"
       }
     ]
   }
   ```

### 3.5 Deploy
1. Click "Deploy"
2. Wait for build to complete (1-2 minutes)
3. **Copy your Vercel URL** (e.g., `https://mini-linkedin-client.vercel.app`)

---

## 🔧 Step 4: Update CORS Configuration

### 4.1 Update Backend CORS
In your Render backend, update the CORS origins:

1. **Go to your Render service dashboard**
2. **Go to Environment → Add Variable:**
   ```
   FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
   ```

3. **Update your server code** (if needed):
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? [process.env.FRONTEND_URL] 
       : ['http://localhost:3000'],
     credentials: true
   }));
   ```

### 4.2 Redeploy Backend
1. **Trigger a new deployment** in Render
2. **Wait for deployment to complete**

---

## 🧪 Step 5: Test Your Deployment

### 5.1 Test Backend API
```bash
# Test your backend
curl https://your-render-backend-url.onrender.com/api/auth

# Expected response:
# {"message": "Auth routes working"}
```

### 5.2 Test Frontend
1. **Visit your Vercel URL**
2. **Try to register/login**
3. **Test creating posts**
4. **Check if data persists**

### 5.3 Test API Endpoints
- `GET /api/auth` - Should return auth routes info
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post

---

## 🔒 Security Configuration

### 5.1 Update JWT Secret
1. **Generate a strong JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **Update in Render environment variables:**
   ```
   JWT_SECRET=your-generated-secret-here
   ```

### 5.2 Environment Variables Checklist
**Render (Backend):**
- ✅ `MONGODB_URI`
- ✅ `JWT_SECRET`
- ✅ `NODE_ENV=production`
- ✅ `PORT=5000`

**Vercel (Frontend):**
- ✅ `REACT_APP_API_URL`

---

## 🆘 Troubleshooting

### Common Issues:

**1. CORS Errors**
- Check CORS origins in backend
- Ensure frontend URL is correct
- Verify environment variables

**2. Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check build logs in Vercel/Render

**3. API Connection Issues**
- Verify API URL in frontend
- Check backend is running
- Test API endpoints directly

**4. MongoDB Connection**
- Verify connection string
- Check MongoDB Atlas network access
- Ensure database exists

### Debug Commands:
```bash
# Test backend locally
cd server && npm start

# Test frontend locally
cd client && npm start

# Check environment variables
echo $MONGODB_URI
echo $JWT_SECRET
```

---

## 📱 Final URLs

After successful deployment:

**Frontend:** `https://your-app.vercel.app`
**Backend:** `https://your-app.onrender.com`
**API Base:** `https://your-app.onrender.com/api`

---

## 🎉 Success!

Your Mini LinkedIn app is now live on:
- **Frontend**: Vercel (fast, global CDN)
- **Backend**: Render (reliable, auto-scaling)
- **Database**: MongoDB Atlas (cloud database)

**Next Steps:**
1. Test all features
2. Set up custom domain (optional)
3. Monitor performance
4. Set up analytics

---

## 📞 Support

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Render**: [render.com/docs](https://render.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com) 