import React, { useEffect, useState } from "react";
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
} from "@mui/material";
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

const PostList = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAddPost = (body: string) => {
    dispatch(addPost(body));
  };

  const handleEditPost = (id: number, body: string) => {
    dispatch(editPost({ id, body }));
    setEditingPost(null);
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center">
        Posts
      </Typography>
      <Paper style={{ padding: 16, marginBottom: 24 }}>
        <NewPostForm addPost={handleAddPost} />
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
                        {new Date(post.created).toLocaleString()}
                      </Typography>
                    </>
                  )}
                </CardContent>
                <Divider />
                <CardActions>
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
