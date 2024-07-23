import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import PostFormModal from '../components/modals/PostFormModal';
import PostResponseModal from '../components/modals/PostResponseModal';
import { closeModal } from '../redux/createModalSlice';
import { RootState } from '../redux/store';

const CreatePost = () => {
  const [responseModal, setResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>();
  const createModal = useSelector((state: RootState) => state.createModal.isOpen);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (newPost) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: newPost }),
      });

      if (!response.ok) {
        dispatch(closeModal());
        setResponseMessage('Failed to create a post!');
        setResponseModal(true);
        return;
      }

      const data = await response.json();
      console.log(data);

      dispatch(closeModal());
      setResponseMessage('Successfully created a post!');
      setResponseModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  return (
    <>
      <PostFormModal onClose={handleClose} onSubmit={handleSubmit} type="create" isOpen={createModal} />
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

export default CreatePost;
