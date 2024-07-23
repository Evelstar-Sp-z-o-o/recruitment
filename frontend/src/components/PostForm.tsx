import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField } from '@mui/material';

import { createPost, updatePost } from '../redux/actions/posts';
import { RootState } from '../redux/reducers';
import { PostData, Post as PostType } from '../types';

const PostForm: React.FC = () => {
  const dispatch = useDispatch();
  const editingPost = useSelector((state: RootState) => state.posts.editingPost);

  const [post, setPost] = useState<PostData>({
    body: '',
    author: '',
    created: Date.now() / 1000,
    edited: Date.now() / 1000,
    postId: '',
  });

  useEffect(() => {
    if (editingPost) {
      setPost(editingPost.data);
    }
  }, [editingPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      dispatch(updatePost({ id: editingPost.id, data: post }));
    } else {
      dispatch(createPost({ id: 0, data: post }));
    }
    setPost({ body: '', author: '', created: Date.now() / 1000, edited: Date.now() / 1000, postId: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Body" value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} required />
      <TextField
        label="Author"
        value={post.author}
        onChange={(e) => setPost({ ...post, author: e.target.value })}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {editingPost ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  );
};

export default PostForm;
