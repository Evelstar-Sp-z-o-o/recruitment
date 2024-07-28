import { FunctionComponent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { nanoid } from 'nanoid';

import InputController from '@/src/infrastructure/components/FormControllers/InputController/InputController';
import { RootState, useAppSelector } from '@/src/infrastructure/store';
import formatDateToTimestamp from '@/src/infrastructure/utils/formatDateToTimestamp';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Paper } from '@mui/material';

import { useAddPostMutation } from '../../store/postsApi';

import useWidthScreen from '../../utils/useWidthScreen';
import schema from './utils/schema';

const currentDate = formatDateToTimestamp();

const AddPostForm: FunctionComponent = () => {
  const [triggerAddPost] = useAddPostMutation();

  const { isSmallScreen } = useWidthScreen();

  const userName = useAppSelector((state: RootState) => state.user.username);

  const formMethods = useForm<{ post: string }>({
    defaultValues: {
      post: '',
    },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const { handleSubmit, reset, getValues } = formMethods;

  const addPost = async () => {
    const post = getValues('post');

    try {
      await triggerAddPost({ body: post, author: userName, created: currentDate, postId: nanoid() }).unwrap();

      toast.success('Post added successfully!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      reset();
    } catch (error) {
      toast.error(error.message ?? 'Failed to add post!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ marginY: 2, width: isSmallScreen ? 350 : 600 }}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(addPost)}>
          <InputController
            multiline
            fieldName="post"
            startAdornment={<Avatar sx={{ margin: 2 }} />}
            placeholder="What's up?"
            endAdornment={
              <Button type="submit" variant="contained" sx={{ margin: 2 }} data-testid="addPostButton">
                Post
              </Button>
            }
            style={{ width: '100%' }}
          />
        </form>
      </FormProvider>
    </Paper>
  );
};

export default AddPostForm;
