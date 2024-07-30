import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostFormData } from '@/src/types';
import { Edit, Delete } from '@mui/icons-material';
import {
    CircularProgress,
    Container,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import PostForm from '../components/base/post-form';
import FetchErrorWrapper from '../components/ui/fetch-error-wrapper';
import useDeletePost from '../hooks/use-delete-post';
import useEditPost from '../hooks/use-edit-post';
import useSinglePost from '../hooks/use-single-post';
import PostTime from '../components/ui/postTime';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar } from '../redux/slices/snackbar-slice';
import { RootState } from '../redux/store';

const emptyPageContainerStyles = {
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};
const pageContainerStyles = { my: 3, padding: '0px !important', p: 2 };
const pageHeaderStyles = {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
};

const editDialogStyles = {
    '.MuiPaper-root': {
        padding: 0,
        width: '90%',
        maxWidth: '500px',
    },
};

const deleteDialogStyles = {
    '.MuiPaper-root': {
        padding: 1,
        width: '90%',
        maxWidth: '350px',
    },
};

const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
};

const PostDetailsPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user);
    const { postId } = useParams();
    const { isLoading, data: post, isError, refetch } = useSinglePost(postId || '');
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const {
        mutate: updatePost,
        isPending: isEditPostPending,
        isSuccess: isEditPostSuccess,
        reset: resetEditPost,
    } = useEditPost(postId || '');
    const {
        mutate: deletePost,
        isSuccess: isDeletePostSuccess,
    } = useDeletePost(postId || '');

    const handleEditPost = (data: PostFormData) => {
        updatePost(data);
        handleEditDialogClose();
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);

        // make sure the modal is closed before reset
        setTimeout(() => {
            resetEditPost();
        }, 100);
    };

    const handleDeletePost = () => {
        deletePost();
        setDeleteDialogOpen(false);
        navigate('/posts');
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        if (isEditPostSuccess) {
            dispatch(showSnackbar({ message: 'Post updated successfully', severity: 'success' }));
        }
    }, [dispatch, isEditPostSuccess]);

    useEffect(() => {
        if (isDeletePostSuccess) {
            navigate('/posts');
            dispatch(showSnackbar({ message: 'Post deleted successfully', severity: 'success' }));
        }
    }, [dispatch, isDeletePostSuccess, navigate]);

    if (isLoading)
        return (
            <Box sx={emptyPageContainerStyles}>
                <CircularProgress />
            </Box>
        );

    if (isError)
        return <FetchErrorWrapper errorText="Something went wrong when downloading post details." refetchFn={refetch} />;

    if (!post)
        return (
            <Box sx={emptyPageContainerStyles}>
                <Typography>Could not find module with provided id.</Typography>
            </Box>
        );

    return (
        <Container sx={pageContainerStyles}>
            <Box sx={pageHeaderStyles}>
                <Box sx={headerStyles}>
                    <Avatar alt={post.author}>{post.author.charAt(0)}</Avatar>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {post.author}
                    </Typography>
                </Box>
                {user.email === post.author &&
                    (<Box ml="auto" display="flex" gap={2}>
                        <Button variant="text" color="primary" startIcon={<Edit />} onClick={() => setEditDialogOpen(true)}>
                            Edit Post
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() => setDeleteDialogOpen(true)}
                            sx={{ boxShadow: 'none' }}
                        >
                            Delete Post
                        </Button>
                    </Box>
                    )}
            </Box>
            <PostTime created={post.created} edited={post.edited} />
            <Typography mt={5}>
                {post.body}
            </Typography>
            <Dialog open={isEditDialogOpen} onClose={handleEditDialogClose} sx={editDialogStyles}>
                <DialogTitle>Edit post</DialogTitle>
                <DialogContent>
                    <PostForm isPending={isEditPostPending} onSubmit={handleEditPost} initialValues={{ body: post.body }} />
                </DialogContent>
            </Dialog>
            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose} sx={deleteDialogStyles}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this post?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeletePost} variant="contained" color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PostDetailsPage;
