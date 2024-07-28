import { FunctionComponent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import InputController from '@/src/infrastructure/components/FormControllers/InputController';
import formatDateToTimestamp from '@/src/infrastructure/utils/formatDateToTimestamp';
import { useEditPostMutation } from '@/src/presentation/store/postsApi';
import { PostsResponse } from '@/src/presentation/store/types';
import useWidthScreen from '@/src/presentation/utils/useWidthScreen';
import { yupResolver } from '@hookform/resolvers/yup';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Avatar, Box, Button, IconButton, Modal, Typography } from '@mui/material';

import schema from './utils/schema';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const currentDate = formatDateToTimestamp();

type Props = {
  post: PostsResponse;
};

const EditPost: FunctionComponent<Props> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [triggerEditPost] = useEditPostMutation();

  const { isSmallScreen } = useWidthScreen();

  const formMethods = useForm<{ post: string }>({
    defaultValues: {
      post: '',
    },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, getValues } = formMethods;

  const {
    data: { author, created, postId, body },
    id,
  } = post;

  const editPost = async () => {
    const editedPost = getValues('post');

    try {
      await triggerEditPost({ body: editedPost, author, created, edited: currentDate, postId, id }).unwrap();

      toast.success('Post edited successfully!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      reset();
      handleClose();
    } catch (error) {
      toast.error(error.message ?? 'Failed to edit post!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <>
      <IconButton aria-label="delete" size="small" onClick={handleOpen} data-testid="openEditButton">
        <EditNoteIcon fontSize="small" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-testid="editModal"
      >
        <Box sx={{ ...style, width: isSmallScreen ? 350 : 600 }}>
          <Typography variant="h5" textAlign="center">
            Edit your post!
          </Typography>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(editPost)}>
              <InputController
                multiline
                fieldName="post"
                startAdornment={<Avatar sx={{ margin: 2 }} />}
                placeholder={body}
                style={{ width: '100%' }}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained" sx={{ margin: 2 }} data-testid="editButton">
                  Edit
                </Button>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};

export default EditPost;
