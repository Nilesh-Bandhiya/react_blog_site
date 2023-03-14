import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link className="footer-link" color="inherit" to="#">
        Blog App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const navigate = useNavigate()
  // const users = useSelector((state) => state.users.users) 
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((result) => result.json())
      .then((data) => setUsers(data)).catch((error) => {
        toast.error(error.message)
      });
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
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const loginHandler = (data) => {

    const user = users?.find((user) => user.email === data.email);

    if (user) {
      if (data.password !== user.password) {
        setError("password", { type: "custom", message: "Invalid Password or UserName" }, { shouldFocus: true });
      } else {

        if (user.active) {
          toast.success("Loggedin successfully")
          let token = { user: user.firstName, email: user.email, role: user.role, userId: user.id }
          localStorage.setItem("token", JSON.stringify(token))
          navigate("/")
        } else {
          toast.error("Sorry You can't Loggedin")
        }
      }
    } else {
      setError("email", { type: "custom", message: "User is not Valid" }, { shouldFocus: true });
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={5}
        sx={{
          marginTop: 1,
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="forgot-link" to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 3 }} />
      </Paper>
    </Container>
  );
};

export default Login;
