import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import PostFormModal from '../components/modals/PostFormModal';
import PostResponseModal from '../components/modals/PostResponseModal';
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
  const [responseModal, setResponseModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>();

  const navigate = useNavigate();

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
        setResponseMessage('Failed to update a post!');
        setResponseModal(true);
        return;
      }

      const data = await response.json();

      setResponseMessage('Successfully updated a post!');
      setResponseModal(true);
      editPost({ ...data.data, id: data.id });
    } catch (error) {
      console.error(error);
    }
  };

  if (!isLoading && !post) {
    return <PostResponseModal open={true} onClose={() => navigate('/')} content="Requested post doesn't exist" />;
  }

  return (
    <>
      {!responseModal && (
        <PostFormModal
          initialData={post}
          isOpen={pathname.startsWith('/posts/update/')}
          onClose={() => navigate('/posts')}
          type="edit"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
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
