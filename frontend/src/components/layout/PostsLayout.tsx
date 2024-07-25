import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';

import Posts from '@/src/pages/Posts';
import { Post } from '@/src/types';
import { currentUser } from '@/src/utils';

import { openModal as editModal } from '../../redux/editModalSlice';
import Loader from '../Loader';

function PostsLayout() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();

  // Open edit modal if current path is /posts/update/
  useEffect(() => {
    if (location.pathname.startsWith('/posts/update/')) {
      dispatch(editModal());
    }
  }, [dispatch, location]);

  // Fetch current user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts`);

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        const dataWithId = data.map((post) => ({ ...post.data, id: post.id }));
        dataWithId.sort((a, b) => b.createdAt - a.createdAt);
        const currentUserPosts = dataWithId.filter((post) => post.username === currentUser);
        setPosts(currentUserPosts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Update posts list after editing
  const updatePosts = (updatedPost: Post) => {
    const postsAfterEdit = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
    setPosts(postsAfterEdit);
  };

  // Remove deleted post from the list
  const deletePost = (postId: string) => {
    const postsAfterDeletion = posts.filter((post) => post.id !== postId);
    setPosts(postsAfterDeletion);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Posts posts={posts} removePost={deletePost} />
      <Outlet context={updatePosts} />
    </>
  );
}

export default PostsLayout;
