import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@mui/material';

import { deletePost, setEditingPost } from '../redux/actions/posts';
import { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  return (
    <div>
      <h2>{post?.data?.body}</h2>
      <p>ID: {post?.id}</p>
      <p>Author: {post?.data?.author}</p>
      <p>Created: {new Date(post?.data?.created * 1000).toLocaleString()}</p>
      <p>Edited: {new Date(post?.data?.edited * 1000).toLocaleString()}</p>
      <Button variant="contained" color="primary" onClick={handleEdit}>
        Edit
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default Post;
