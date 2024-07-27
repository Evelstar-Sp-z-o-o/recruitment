import { useCallback, useEffect, useState } from 'react';

import { Post } from '../types';

const useGetPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all posts from database
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/posts');

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      const dataWithId = data.map((post) => ({ ...post.data, id: post.id }));
      dataWithId.sort((a: Post, b: Post) => b.createdAt - a.createdAt);
      setPosts(dataWithId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update a changed post
  const editPost = useCallback(
    (updatedPost: Post) => {
      const postsAfterEdit = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
      setPosts(postsAfterEdit);
    },
    [posts],
  );

  // Remove a deleted post
  const deletePost = useCallback(
    (postId: string) => {
      const postsAfterDeletion = posts.filter((post) => post.id !== postId);
      setPosts(postsAfterDeletion);
    },
    [posts],
  );

  // Filter a post based on postId
  const fetchPostById = useCallback(
    (postId: string) => {
      return posts.find((post) => post.id.toString() === postId);
    },
    [posts],
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, isLoading, refetch: fetchPosts, editPost, deletePost, fetchPostById };
};

export default useGetPosts;
