import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Grid, TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getBlogs } from '../store/blogs-slice';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const BlogDialog = ({ open, handleEditClose, formData, currentUserId }) => {
    const dispatch = useDispatch()

    let { id, userId, image, title, author, category, description } = formData;


    const validation = yup.object().shape({
        title: yup
            .string()
            .required("Title is Required"),

        author: yup
            .string()
            .required("Author is Required"),

        category: yup
            .string()
            .required("Category is Required"),

        image: yup
            .string()
            .required("Image is Required"),

        description: yup
            .string()
            .required("Category is Required")
            .min(10, "description must be at least 10 character")
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validation),
    });


    useEffect(() => {
        if (id) {
            setValue('title', title, { shouldValidate: false }, { shouldTouch: true },)
            setValue('author', author, { shouldValidate: false }, { shouldTouch: true },)
            setValue('category', category, { shouldValidate: false }, { shouldTouch: true },)
            setValue('image', image, { shouldValidate: false }, { shouldTouch: true },)
            setValue('description', description, { shouldValidate: false }, { shouldTouch: true },)
        } else {
            setValue('title', '', { shouldValidate: false }, { shouldTouch: true },)
            setValue('author', '', { shouldValidate: false }, { shouldTouch: true },)
            setValue('category', '', { shouldValidate: false }, { shouldTouch: true },)
            setValue('image', '', { shouldValidate: false }, { shouldTouch: true },)
            setValue('description', '', { shouldValidate: false }, { shouldTouch: true },)
        }
    }, [author, category, description, id, title, image, setValue])


    const addBlogHandler = (data) => {

        // when new blog added we also save which admin add this blog
        let newData = { ...data, userId: currentUserId }
        let newDataUpdate = {...data, userId: userId }

        if (id) {
            if (userId === currentUserId) {
                fetch(`http://localhost:5000/blogs/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newDataUpdate),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Success", data);
                        toast.success("Blog Updated Successfully")
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        toast.error(error.message)
                    });
  
            } else {
                toast.error("You can not Update this Blog")
            }

        } else {
            fetch("http://localhost:5000/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            })
                .then((response) => response.json())
                .then((data) => {
                    toast.success("Blog Added Successfully")
                })
                .catch((error) => {
                    console.error("Error:", error);
                    toast.error(error.message)
                });
        }

        handleEditClose();
        dispatch(getBlogs());

        setValue('title', '', { shouldValidate: false }, { shouldTouch: true },)
        setValue('author', '', { shouldValidate: false }, { shouldTouch: true },)
        setValue('category', '', { shouldValidate: false }, { shouldTouch: true },)
        setValue('image', '', { shouldValidate: false }, { shouldTouch: true },)
        setValue('description', '', { shouldValidate: false }, { shouldTouch: true },)

    }


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add New Blog"}
                </DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(addBlogHandler)}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        {...register("title")}
                                        error={errors.title ? true : false}
                                        helperText={errors.title?.message}
                                        autoFocus
                                        id="title"
                                        label="Title"
                                        name="title"
                                        autoComplete="title"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        {...register("author")}
                                        error={errors.author ? true : false}
                                        helperText={errors.author?.message}
                                        id="author"
                                        label="Author"
                                        name="author"
                                        autoComplete="author"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        {...register("category")}
                                        error={errors.category ? true : false}
                                        helperText={errors.category?.message}
                                        id="category"
                                        label="Category"
                                        name="category"
                                        autoComplete="category"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        {...register("image")}
                                        error={errors.image ? true : false}
                                        helperText={errors.image?.message}
                                        id="image"
                                        label="Image"
                                        name="image"
                                        autoComplete="image"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Textarea
                                        required {...register("description")}
                                        error={errors.description ? true : false}
                                        name="description"
                                        id="description"
                                        placeholder="Enter Blog description here ..."
                                        minRows={5} variant="outlined" />
                                </Grid>
                            </Grid>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "end",
                                    marginTop: "20px"
                                }}
                            >
                                <Button type='button' variant='outlined' color='error' onClick={handleEditClose} sx={{ marginRight: "10px" }}>Cancel</Button>
                                <Button type='submit' variant='contained' color={id ? "success" : "primary"} autoFocus>
                                    {id ? "Update" : "Add"}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BlogDialog