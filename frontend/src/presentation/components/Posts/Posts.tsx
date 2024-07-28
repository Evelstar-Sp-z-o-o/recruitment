import { FunctionComponent, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import ErrorBoundary from '@/src/infrastructure/components/Error/ErrorBoundary';
import Order from '@/src/presentation/store/constants/order';
import { INITIAL_PAGE, ITEMS_PER_PAGE } from '@/src/presentation/store/constants/pagination';
import { Typography } from '@mui/material';

import { useGetPostsQuery } from '../../store/postsApi';

import Post from '../Post';
import PostLoader from '../Post/components/PostLoader/PostLoader';

const Posts: FunctionComponent = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const [hasMore, setHasMore] = useState(true);

  const { data: posts, isLoading, isError, refetch } = useGetPostsQuery({ sort: 'id', order: Order.DESC, page });

  useEffect(() => {
    if (posts && posts.length < page * ITEMS_PER_PAGE) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [posts, page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  if (isError) {
    return <ErrorBoundary refetch={refetch} />;
  }

  if (isLoading) {
    return Array.from({ length: 5 }, (_, index) => <PostLoader key={index} />);
  }

  if (!posts.length) {
    return <Typography variant="h5">There are no posts.</Typography>;
  }

  console.log('posts');
  console.log(posts);
  return (
    <InfiniteScroll
      dataLength={posts?.length ?? 0}
      next={handleNextPage}
      hasMore={hasMore}
      loader={Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
        <PostLoader key={index} />
      ))}
      endMessage={
        <Typography textAlign="center" fontWeight="600">
          Yay! You have seen it all!
        </Typography>
      }
    >
      <div data-testid="posts">
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Posts;
