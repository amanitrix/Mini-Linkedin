import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreatePost from './CreatePost';
import Post from './Post';

const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post._id === updatedPost._id ? updatedPost : post
    ));
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="main-content">
      <div className="feed-container">
        {user && <CreatePost onPostCreated={addPost} />}
        
        {posts.length === 0 ? (
          <div className="card text-center">
            <h3>No posts yet</h3>
            <p className="text-muted">
              {user ? 'Be the first to share something!' : 'Sign in to see posts'}
            </p>
            {!user && (
              <Link to="/login" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>
        ) : (
          posts.map(post => (
            <Post
              key={post._id}
              post={post}
              user={user}
              onDelete={deletePost}
              onUpdate={updatePost}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home; 