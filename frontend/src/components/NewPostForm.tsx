import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";

const NewPostForm = ({ addPost }) => {
  const validationSchema = Yup.object({
    body: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={{ body: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        addPost(values.body);
        resetForm();
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
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
            Add Post
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;
