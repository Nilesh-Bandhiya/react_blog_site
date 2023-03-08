import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Blog App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignUp = () => {
  const validation = yup.object().shape({
    firstName: yup
      .string()
      .required("First Name is Required")
      .min(3, "First Name must be at least 3 character"),

      lastName: yup
      .string()
      .required("Last Name is Required")
      .min(3, "Last Name must be at least 3 character"),

    email: yup
      .string()
      .required("Email is Required")
      .email("Plaese Enter Valid Email"),

    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Password must be at least 6 character long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const signUpHandler = (data) => {
    console.log("data", data);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })    
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={5}
        sx={{
          marginTop: 8,
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(signUpHandler)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  {...register("firstName")}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName?.message}
                  autoFocus
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  {...register("lastName")}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName?.message}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("email")}
                  error={errors.email ? true : false}
                  helperText={errors.email?.message}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("password")}
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 3 }} />
      </Paper>
    </Container>
  );
};

export default SignUp;
