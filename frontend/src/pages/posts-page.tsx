import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Box } from '@mui/material';

import PostForm from '../components/base/post-form';
import PostsList from '../components/base/posts-list';
import useCreatePost from '../hooks/use-create-post';
import usePosts from '../hooks/use-posts';
import { showSnackbar } from '../redux/slices/snackbar-slice';

const PostsPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch } = usePosts();
  const { isPending, mutate: addPostMutation, isSuccess } = useCreatePost();

  useEffect(() => {
    if (isSuccess) {
      dispatch(showSnackbar({ message: 'Post created successfully', severity: 'success' }));
    }
  }, [dispatch, isSuccess]);

  return (
    <>
      <Box mt={4}>
        <PostForm isPending={isPending} onSubmit={addPostMutation} initialValues={{ body: '' }} />
      </Box>
      <PostsList posts={data} isLoading={isLoading} isError={isError} refetch={refetch} />
    </>
  );
};

export default PostsPage;
