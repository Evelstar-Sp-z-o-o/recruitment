import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts } from '../redux/actions/posts';
import { RootState } from '../redux/reducers';
import CreatePost from './CreatePost';
import Post from './Post';

const PostList: FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <CreatePost />
      {posts
        .slice()
        .reverse()
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
};

export default PostList;
