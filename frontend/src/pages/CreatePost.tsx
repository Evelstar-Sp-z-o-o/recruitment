import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PostFormModal from '../components/modals/PostFormModal';
import PostResponseModal from '../components/modals/PostResponseModal';
import { Post } from '../types';

interface CreatePostProps {
  refetchPosts: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ refetchPosts }) => {
  const { pathname } = useLocation();
  const [responseModal, setResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const navigate = useNavigate();

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
        setResponseMessage('Failed to create a post!');
        setResponseModal(true);
        return;
      }
      setResponseMessage('Successfully created a post!');
      setResponseModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseResponse = () => {
    setResponseModal(false);
    navigate('/');
    refetchPosts();
  };

  return (
    <>
      {!responseModal && (
        <PostFormModal
          onClose={() => navigate(-1)}
          onSubmit={handleSubmit}
          type="create"
          isOpen={pathname === '/create'}
        />
      )}
      <PostResponseModal open={responseModal} onClose={handleCloseResponse} content={responseMessage} />
    </>
  );
};

export default CreatePost;
