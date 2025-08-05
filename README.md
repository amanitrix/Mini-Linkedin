# Mini LinkedIn-like Community Platform

A full-stack social networking platform built with React, Node.js, Express, and MongoDB, featuring user authentication, post creation, likes, comments, and user profiles.

## Features

### 🔐 User Authentication
- User registration with email and password
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes and middleware

### 📝 Public Post Feed
- Create and display text-only posts
- Real-time post feed with author information
- Timestamp display for all posts
- Responsive design for all devices

### 👤 Profile Management
- User profiles with name, email, and bio
- Edit profile information
- View user's posts on their profile
- Public profile pages for all users

### 💬 Social Features
- Like and unlike posts
- Add comments to posts
- Delete own posts and comments
- View post engagement metrics

## Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with LinkedIn-inspired design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-linkedin-platform
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/mini-linkedin
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On Windows
   net start MongoDB
   
   # On macOS/Linux
   sudo systemctl start mongod
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```
   The React app will run on `http://localhost:3000`

3. **Or run both simultaneously**
   ```bash
   # From the root directory
   npm run dev
   ```

### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd server
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get post by ID
- `DELETE /api/posts/:id` - Delete a post
- `PUT /api/posts/like/:id` - Like/unlike a post
- `POST /api/posts/comment/:id` - Add comment to post
- `DELETE /api/posts/comment/:id/:comment_id` - Delete comment

### Users
- `GET /api/users/profile/:id` - Get user profile
- `GET /api/users/:id/posts` - Get user's posts
- `PUT /api/users/profile` - Update user profile

## Project Structure

```
mini-linkedin-platform/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config.env         # Environment variables
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## Features in Detail

### User Authentication
- Secure registration with email validation
- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes and middleware
- Automatic token refresh

### Post System
- Create text-only posts with character limits
- Real-time post feed with newest posts first
- Author information and timestamps
- Like/unlike functionality
- Comment system with nested replies
- Delete own posts and comments

### Profile System
- User profiles with customizable bio
- Profile editing capabilities
- View other users' profiles
- Display user's posts on their profile
- Member since information

### UI/UX Features
- Responsive design for mobile and desktop
- LinkedIn-inspired color scheme and layout
- Loading states and error handling
- Form validation and user feedback
- Smooth animations and transitions

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Protected API endpoints
- User authorization checks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

## Future Enhancements

- Image upload support
- Real-time notifications
- User search functionality
- Post sharing
- Advanced privacy settings
- Mobile app development 