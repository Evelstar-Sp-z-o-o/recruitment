import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import PostFormModal from '../components/modals/PostFormModal';
import PostResponseModal from '../components/modals/PostResponseModal';
import { closeModal, openModal } from '../redux/responseModalSlice';
import { RootState } from '../redux/store';
import { Post } from '../types';

interface UpdatePostProps {
  editPost: (updatedPost: Post) => void;
  fetchPostById: (postId: string) => Post;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ editPost, fetchPostById }) => {
  const { postId } = useParams();
  const { pathname } = useLocation();
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state: RootState) => state.responseModal.isOpen);

  useEffect(() => {
    setIsLoading(true);
    if (postId) {
      setPost(fetchPostById(postId));
    }
    setIsLoading(false);
  }, [postId, fetchPostById]);

  // Update post in database
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
        dispatch(openModal('Failed to update a post!'));
        return;
      }

      const data = await response.json();

      dispatch(openModal('Successfully updated a post!'));
      editPost({ ...data.data, id: data.id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
    navigate('/posts');
  };

  if (!isLoading && !post) {
    dispatch(openModal("Requested post doesn't exist"));

    return <PostResponseModal onClose={handleClose} />;
  }

  return (
    <>
      {!isModalOpen && (
        <PostFormModal
          initialData={post}
          isOpen={pathname.startsWith('/posts/update/')}
          onClose={() => navigate('/posts')}
          type="edit"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
      <PostResponseModal onClose={handleClose} />
    </>
  );
};

export default UpdatePost;
