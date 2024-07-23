import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const EditPostForm = ({ post, editPost, cancelEdit }) => {
  const validationSchema = Yup.object({
    body: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{ body: post.body }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        editPost(post.id, values.body);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            as={TextField}
            name="body"
            label="Post"
            fullWidth
            margin="normal"
            variant="outlined"
            error={touched.body && Boolean(errors.body)}
            helperText={touched.body && errors.body}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginRight: 8 }}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditPostForm;
