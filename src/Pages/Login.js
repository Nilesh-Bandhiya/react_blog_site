import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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

const Copyright = (props) => {
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
};

const Login = () => {

    const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((result) => result.json())
      .then((data) => setUsers(data));
  }, []);

  const validation = yup.object().shape({
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

  const loginHandler = (data) => {
    console.log("data", data);

    const user = users.find((user) => user.email === data.email);

    if (user) {
        if (data.password !== user.password) {
          // Invalid password
          console.log("Password is Not Valid");
        } else {
         console.log("successfully submited");
        }
      } else {
        // Username not found
        console.log("User is Not Valid");
      }
    }
  

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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(loginHandler)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("email")}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("password")}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 6, mb: 3 }} />
      </Paper>
    </Container>
  );
};

export default Login;
