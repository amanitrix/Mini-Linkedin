import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = ({ post, user, onDelete, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

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
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const handleLike = async () => {
    if (!user) return;
    
    try {
      const res = await axios.put(`/api/posts/like/${post._id}`);
      onUpdate({ ...post, likes: res.data });
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;

    setLoading(true);
    try {
      const res = await axios.post(`/api/posts/comment/${post._id}`, {
        text: commentText
      });
      onUpdate({ ...post, comments: res.data });
      setCommentText('');
    } catch (err) {
      console.error('Error commenting:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(`/api/posts/comment/${post._id}/${commentId}`);
      onUpdate({ ...post, comments: res.data });
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`/api/posts/${post._id}`);
        onDelete(post._id);
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  const isLiked = user && post.likes.includes(user._id);
  const canDelete = user && post.author._id === user._id;

  return (
    <div className="card">
      <div className="d-flex justify-between align-center mb-3">
        <div className="d-flex align-center gap-3">
          <Link to={`/user/${post.author._id}`}>
            <div className="avatar">
              {getInitials(post.author.name)}
            </div>
          </Link>
          <div>
            <Link 
              to={`/user/${post.author._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <strong>{post.author.name}</strong>
            </Link>
            <div className="text-muted" style={{ fontSize: '12px' }}>
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
        {canDelete && (
          <button
            onClick={handleDeletePost}
            className="btn btn-danger"
            style={{ fontSize: '12px', padding: '4px 8px' }}
          >
            Delete
          </button>
        )}
      </div>

      <div className="post-content">
        {post.content}
      </div>

      <div className="post-actions">
        <button
          onClick={handleLike}
          className={`post-action ${isLiked ? 'liked' : ''}`}
          disabled={!user}
        >
          <span>👍</span>
          <span>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
        </button>
        
        <button
          onClick={() => setShowComments(!showComments)}
          className="post-action"
        >
          <span>💬</span>
          <span>{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
        </button>
      </div>

      {showComments && (
        <div className="comment-section">
          {user && (
            <form onSubmit={handleComment} className="mb-3">
              <div className="d-flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="form-control"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !commentText.trim()}
                >
                  {loading ? '...' : 'Comment'}
                </button>
              </div>
            </form>
          )}

          {post.comments.map(comment => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '12px' }}>
                  {getInitials(comment.user.name)}
                </div>
                <div>
                  <span className="comment-author">{comment.user.name}</span>
                  <div className="comment-time">{formatDate(comment.createdAt)}</div>
                </div>
                {user && comment.user._id === user._id && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="btn btn-danger"
                    style={{ fontSize: '10px', padding: '2px 6px', marginLeft: 'auto' }}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="comment-text">{comment.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post; 