import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField, Tooltip } from "@mui/material";

const NewPostForm = ({ addPost, disabled }) => {
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
          <Tooltip
            title={disabled ? "Please, log in to add a post" : ""}
            placement="top"
          >
            <span>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
                disabled={disabled}
              >
                Add Post
              </Button>
            </span>
          </Tooltip>
        </Form>
      )}
    </Formik>
  );
};

export default NewPostForm;
