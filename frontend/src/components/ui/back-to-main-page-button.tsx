import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

const BackToMainPageButton = () => {
  const navigate = useNavigate();

  return (
    <Button variant="text" onClick={() => navigate('/posts')} startIcon={<ArrowBackIcon />}>
      Back to Main Page
    </Button>
  );
};

export default BackToMainPageButton;
