import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const Profile = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`/users/${user._id}/posts`);
      setPosts(res.data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const res = await axios.put('/users/profile', formData);
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setUpdateLoading(false);
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

  if (error) {
    return <div className="error">{error}</div>;
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

        {editing ? (
          <div className="profile-edit-form">
            <h2 className="profile-edit-title">Edit Profile</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="form-control"
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="profile-edit-actions">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updateLoading}
                >
                  {updateLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="card">
            <div className="d-flex justify-between align-center">
              <h2>Your Posts</h2>
              <button
                onClick={() => setEditing(true)}
                className="btn btn-secondary"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="card text-center">
            <h3>No posts yet</h3>
            <p className="text-muted">Start sharing to see your posts here!</p>
          </div>
        ) : (
          posts.map(post => (
            <Post
              key={post._id}
              post={post}
              user={user}
              onDelete={(postId) => setPosts(posts.filter(p => p._id !== postId))}
              onUpdate={(updatedPost) => setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Profile; 