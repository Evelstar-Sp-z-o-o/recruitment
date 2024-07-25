import React, { type ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Paper,
  Box,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { useUser } from "../utils/UserProvider";
import { AppDispatch, RootState } from "../store/store";
import {
  addPost,
  deletePost,
  editPost,
  fetchPosts,
  Post,
} from "../store/actions/posts";
import EditPostForm from "./EditPostForm";
import NewPostForm from "./NewPostForm";

const PostList = (): ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const { email, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = (body: string) => {
    dispatch(addPost({body, author: email}) );
  };

  const handleEditPost = (id: number, body: string) => {
    dispatch(editPost({ id, body }));
    setEditingPost(null);
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h2">
          Posts
        </Typography>
        <Box>
          {email ? (
            <>
              <Typography variant="body1" display="inline" mr={2}>{email}</Typography>
              <Button color="secondary" variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="primary" variant="contained" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Box>
      </Box>
      <Paper style={{ padding: 16, marginBottom: 24 }}>
        <NewPostForm addPost={handleAddPost} disabled={!email}/>
      </Paper>
      <Grid container spacing={4}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Grid item key={post.id} xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  {editingPost && editingPost.id === post.id ? (
                    <EditPostForm
                      post={post}
                      editPost={handleEditPost}
                      cancelEdit={() => setEditingPost(null)}
                    />
                  ) : (
                    <>
                      <Typography variant="h6">{String(post.body)}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {moment(post.created).fromNow()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Author: {post.author}
                      </Typography>
                    </>
                  )}
                </CardContent>
                <Divider />
                {email && (<CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </Button>
                  {!editingPost && (
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => setEditingPost(post)}
                    >
                      Edit
                    </Button>
                  )}
                </CardActions>
                 )}
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              No posts available.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PostList;
