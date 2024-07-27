import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import PostFormModal from '../components/modals/PostFormModal';
import PostResponseModal from '../components/modals/PostResponseModal';
import { closeModal, openModal } from '../redux/responseModalSlice';
import { RootState } from '../redux/store';
import { Post } from '../types';

interface CreatePostProps {
  refetchPosts: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ refetchPosts }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.responseModal.isOpen);

  // Create a new post
  const handleSubmit = async (newPost: Post) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: newPost }),
      });

      if (!response.ok) {
        dispatch(openModal('Failed to create a post!'));
        return;
      }
      dispatch(openModal('Successfully created a post!'));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseResponse = () => {
    dispatch(closeModal());
    navigate('/');
    refetchPosts();
  };

  return (
    <>
      {!isModalOpen && (
        <PostFormModal
          onClose={() => navigate(-1)}
          onSubmit={handleSubmit}
          type="create"
          isOpen={pathname === '/create'}
        />
      )}
      <PostResponseModal onClose={handleCloseResponse} />
    </>
  );
};

export default CreatePost;
