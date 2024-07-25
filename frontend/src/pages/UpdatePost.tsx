import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import PostFormModal from '../components/modals/PostFormModal';
import PostResponseModal from '../components/modals/PostResponseModal';
import { closeModal } from '../redux/editModalSlice';
import { RootState } from '../redux/store';
import { Post } from '../types';

const UpdatePost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true);
  const [responseModal, setResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>();

  const updatePosts = useOutletContext<(posts: any) => void>();

  const editModal = useSelector((state: RootState) => state.editModal.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/posts');

        if (!response.ok) {
          setResponseMessage('Failed to fetch a post');
          setResponseModal(true);
          return;
        }

        const data = await response.json();
        const dataWithId = data.map((post) => ({ ...post.data, id: post.id }));
        const selectedPost = dataWithId.find((post) => post.id.toString() === postId);
        setPost(selectedPost);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (updatedPost: Post) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: updatedPost }),
      });
      if (!response.ok) {
        dispatch(closeModal());
        setResponseMessage('Failed to update a post!');
        setResponseModal(true);
        return;
      }

      const data = await response.json();

      dispatch(closeModal());
      setResponseMessage('Successfully updated a post!');
      setResponseModal(true);
      updatePosts({ ...data.data, id: data.id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
    navigate('/posts');
  };

  if (!isLoading && !post) {
    return <PostResponseModal open={true} onClose={() => navigate('/')} content="Requested post doesn't exist" />;
  }

  return (
    <>
      <PostFormModal
        initialData={post}
        isOpen={editModal}
        onClose={handleClose}
        type="edit"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <PostResponseModal
        open={responseModal}
        onClose={() => {
          setResponseModal(false);
          navigate('/posts');
        }}
        content={responseMessage}
      />
    </>
  );
};

export default UpdatePost;
