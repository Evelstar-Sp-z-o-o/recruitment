import React, { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useUser } from "../utils/UserProvider";

const Login = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setEmail, email } = useUser();

  useEffect(() => {
    if (email) {
      navigate("/posts");
    }
  }, [navigate]);
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setEmail(values.email);
        navigate("/posts");
      }, 2000);
    },
  });

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" mt={8}>Login</Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{ width: "100%", marginTop: 16 }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <Box mt={2}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Login
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
