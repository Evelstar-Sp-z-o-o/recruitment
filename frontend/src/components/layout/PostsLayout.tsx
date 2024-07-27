import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import Posts from '@/src/pages/Posts';
import { Post } from '@/src/types';
import { currentUser } from '@/src/utils';

interface PostsLayoutProps {
  posts: Post[];
  deletePost: (postId: string) => void;
}

const PostsLayout: React.FC<PostsLayoutProps> = ({ posts, deletePost }) => {
  // Filter current user's posts
  const currentUserPosts = useMemo(() => {
    return posts?.filter((post) => post.username === currentUser) || [];
  }, [posts]);

  return (
    <>
      <Posts currentUserPosts={currentUserPosts} onDelete={deletePost} />
      <Outlet />
    </>
  );
};

export default PostsLayout;
