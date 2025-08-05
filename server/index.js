const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-app.vercel.app', 'https://your-frontend-app.vercel.app/', 'http://localhost:3000'] 
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/users', require('./routes/users'));

// Debug route to check if server is working
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Serve static files in production (only if build directory exists)
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  const indexPath = path.join(buildPath, 'index.html');
  
  // Check if build directory exists
  if (require('fs').existsSync(buildPath)) {
    app.use(express.static(buildPath));
    
    app.get('*', (req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    // If no build directory, just serve API
    app.get('/', (req, res) => {
      res.json({ message: 'Mini LinkedIn API is running!' });
    });
  }
} else {
  // Basic route for development
  app.get('/', (req, res) => {
    res.json({ message: 'Mini LinkedIn API is running!' });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 