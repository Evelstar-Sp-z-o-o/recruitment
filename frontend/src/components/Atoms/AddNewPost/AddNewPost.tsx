import { FC } from 'react';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { blue, grey } from '@mui/material/colors';

interface IAddNewPostProps {
  isFixed?: boolean;
}

const AddNewPost: FC<IAddNewPostProps> = ({ isFixed }) => {
  const StyledIconButton = {
    position: isFixed ? 'fixed' : 'static',
    bottom: '3rem',
    right: '1rem',
  };
  const StyledIcon = {
    color: grey['A100'],
    fontSize: '3.5rem',
    bgcolor: blue[700],
    borderRadius: '50%',
    p: 0,
  };
  return (
    <Tooltip title={'Add new post'}>
      <IconButton sx={StyledIconButton}>
        <AddIcon sx={StyledIcon} />
      </IconButton>
    </Tooltip>
  );
};

export default AddNewPost;
