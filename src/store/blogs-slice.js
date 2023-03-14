import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBlogs = createAsyncThunk(
    'blog/getBlogs',
    async () => {
        const res = await fetch('http://localhost:5000/blogs')
        const data = await res.json()
        return data;
    })
        
const initialState = {
    blogs: [],
    loading: false,
    error: ""
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: {
        [getBlogs.pending]: (state) => {
            state.loading = true
        },
        [getBlogs.fulfilled]: (state, action) => {
            state.loading = false
            state.blogs = action.payload
            state.error = ""
        },
        [getBlogs.rejected]: (state, action) => {
            state.loading = false
            state.blogs = []
            state.error = action.error.message
        },
    },
})


export default blogSlice.reducer;