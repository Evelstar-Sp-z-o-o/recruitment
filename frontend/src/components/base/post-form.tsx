import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { PostFormData } from '@/src/types';
import { LoadingButton } from '@mui/lab';
import { TextField, Box } from '@mui/material';

const formContainerStyles = {
  borderBottom: '1px solid lightgray',
  paddingBottom: '10px',
  borderTop: '1px solid lightgray',
};
const inputStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    borderLeft: 'none',
    borderRight: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-root': {
    paddingBottom: '40px',
  },
};

interface Props {
  onSubmit: (data: PostFormData) => void;
  initialValues: PostFormData;
  isPending: boolean;
}

const PostForm: React.FC<Props> = ({ onSubmit, initialValues, isPending }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const [characterCount, setCharacterCount] = useState(initialValues.body.length);
  const characterLimit = 500;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box position="relative" sx={formContainerStyles}>
        <Controller
          name="body"
          control={control}
          rules={{
            maxLength: {
              value: characterLimit,
              message: `Description cannot exceed ${characterLimit} characters`,
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              disabled={isPending}
              rows={4}
              error={!!errors.body}
              fullWidth
              placeholder="What do you want to share?"
              inputProps={{ maxLength: characterLimit }}
              helperText={errors.body ? errors.body.message : `${characterCount}/${characterLimit} characters`}
              onChange={(e) => {
                field.onChange(e);
                setCharacterCount(e.target.value.length);
              }}
              sx={inputStyles}
            />
          )}
        />
        <Box position="absolute" bottom="8px" right="8px">
          <LoadingButton
            type="submit"
            loading={isPending}
            variant="contained"
            color="primary"
            disabled={!isValid || !isDirty}
            sx={{ boxShadow: 'none' }}
          >
            Publish post
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
};

export default PostForm;
