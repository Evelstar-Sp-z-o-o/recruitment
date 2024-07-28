import { FC, useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface PostMenuItemProps {
  handleDeleteClick: () => void;
  handleEditClick: () => void;
}

const PostItemMenu: FC<PostMenuItemProps> = ({ handleDeleteClick, handleEditClick }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleDeleteClick();
    handleCloseMenu();
  };

  const handleEdit = () => {
    handleEditClick();
    handleCloseMenu();
  };

  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem aria-label="edit" onClick={handleEdit}>
          Edit post
        </MenuItem>
        <MenuItem aria-label="delete" onClick={handleDelete}>
          Delete post
        </MenuItem>
      </Menu>
    </>
  );
};

export default PostItemMenu;
