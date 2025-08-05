import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const [userRes, postsRes] = await Promise.all([
                  axios.get(`/api/users/profile/${id}`),
        axios.get(`/api/users/${id}/posts`)
      ]);
      setUser(userRes.data);
      setPosts(postsRes.data);
    } catch (err) {
      setError('User not found');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error || !user) {
    return <div className="error">{error || 'User not found'}</div>;
  }

  return (
    <div className="main-content">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar avatar-large">
              {getInitials(user.name)}
            </div>
          </div>
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-bio">{user.bio || 'No bio yet'}</p>
          <div className="text-muted">
            Member since {formatDate(user.createdAt)}
          </div>
        </div>

        <div className="card">
          <h2>{user.name}'s Posts</h2>
        </div>

        {posts.length === 0 ? (
          <div className="card text-center">
            <h3>No posts yet</h3>
            <p className="text-muted">{user.name} hasn't shared anything yet.</p>
          </div>
        ) : (
          posts.map(post => (
            <Post
              key={post._id}
              post={post}
              user={null} // We don't have the current user context here
              onDelete={() => {}} // Can't delete other users' posts
              onUpdate={(updatedPost) => setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile; 