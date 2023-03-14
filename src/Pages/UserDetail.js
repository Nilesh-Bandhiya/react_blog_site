import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { getUsers } from '../store/users-slice';

const UserDetail = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    let users = useSelector((state) => state.users.users)
    let currentUserDetail = users?.find((user) => user.id === parseInt(params.userId))

    const [edit, setEdit] = useState(false);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validation = yup.object().shape({
        firstName: yup
            .string()
            .required("First Name is Required")
            .min(3, "First Name must be at least 3 character"),

        lastName: yup
            .string()
            .required("Last Name is Required")
            .min(3, "Last Name must be at least 3 character"),

        phoneNumber: yup.string()
            .required("Phone number is Required")
            .min(6, "Phone number must be at least 6 character")
            .max(10, "Phone number must be max 10 character")
            .matches(phoneRegExp, 'Phone number is not valid'),

        email: yup
            .string()
            .required("Email is Required")
            .email("Plaese Enter Valid Email"),

    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validation),
    });

    const updateUserHandler = (data) => {
        console.log("data", data);

        let newData = { ...currentUserDetail, firstName: data.firstName, lastName: data.lastName, phoneNumber: data.phoneNumber, email: data.email }

        fetch(`http://localhost:5000/users/${currentUserDetail?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                navigate("/")
            })
            .catch((error) => {
                console.error("Error:", error);
            });

            dispatch(getUsers())
    }


    useEffect(() => {
        setValue('firstName', currentUserDetail?.firstName, { shouldValidate: false }, { shouldTouch: true },)
        setValue('lastName', currentUserDetail?.lastName, { shouldValidate: false }, { shouldTouch: true },)
        setValue('phoneNumber', currentUserDetail?.phoneNumber, { shouldValidate: false }, { shouldTouch: true },)
        setValue('email', currentUserDetail?.email, { shouldValidate: false }, { shouldTouch: true },)
    }, [currentUserDetail?.email, currentUserDetail?.firstName, currentUserDetail?.lastName, currentUserDetail?.phoneNumber, setValue])

    return (
        <Container component="main" maxWidth="sm" >
            <CssBaseline />
            <Paper
                elevation={5}
                sx={{
                    marginTop: "24px",
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <Typography component="h1" variant="h5">
                            Your Details
                        </Typography>
                        <IconButton
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() => { setEdit(true) }}
                        >
                            <BorderColorIcon />
                        </IconButton>
                    </Box>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit(updateUserHandler)}
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
                                    disabled={!edit}
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
                                    disabled={!edit}
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
                                    {...register("phoneNumber")}
                                    error={errors.phoneNumber ? true : false}
                                    helperText={errors.phoneNumber?.message}
                                    id="phoneNumber"
                                    disabled={!edit}
                                    label="Mobile Number"
                                    type="number"
                                    name="phoneNumber"
                                    autoComplete="phoneNumber"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    {...register("email")}
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
                                    disabled={!edit}
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={6}>
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    {...register("cpassword")}
                                    error={errors.cpassword ? true : false}
                                    helperText={errors.cpassword?.message}
                                    name="cpassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="cpassword"
                                    autoComplete="confirm-password"
                                />
                            </Grid> */}
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }} >
                                <Button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    variant="contained"
                                    sx={{ mt: 2, mb: 1, mr: 2 }}
                                >
                                    Go to Home
                                </Button>
                                <Button
                                    type="submit"
                                    color='success'
                                    disabled={!edit}
                                    variant="contained"
                                    sx={{ mt: 2, mb: 1 }}
                                >
                                    Update
                                </Button>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>

    )
}

export default UserDetail