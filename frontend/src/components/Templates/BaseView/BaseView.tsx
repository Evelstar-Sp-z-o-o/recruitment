import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddNewPost from '@/src/components/Atoms/AddNewPost/AddNewPost';
import CreatePostModal from '@/src/components/Molecules/CreatePost/CreatePost';
import Menu from '@/src/components/Molecules/Menu/Menu';
import Footer from '@/src/components/Organisms/Footer/Footer';
import Header from '@/src/components/Organisms/Header/Header';
import PostsList from '@/src/components/Organisms/PostsList/PostsList';
import Typography from '@mui/material/Typography';

const BaseView = ({ posts }) => {
  const [open, setOpen] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleTogglePostModal = () => {
    setOpenPostModal((prevState) => !prevState);
  };

  return (
    <>
      <Header toggleMenu={toggleMenu} />
      {posts && posts.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <Typography color="text.secondary" align="center" sx={{ mt: '10rem', fontSize: '2rem' }}>
          {t('noPosts')}
        </Typography>
      )}
      <Menu open={open} toggleMenu={toggleMenu(false)} />
      <AddNewPost isFixed onClick={handleTogglePostModal} />
      <CreatePostModal open={openPostModal} close={handleTogglePostModal} />
      <Footer />
    </>
  );
};

export default BaseView;
