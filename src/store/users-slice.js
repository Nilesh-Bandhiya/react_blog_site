import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

 export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
      const res = await fetch('http://localhost:5000/users')
      const data = await res.json()
    return data;
  })

  const initialState = {
    users: [],
    loading: false,
    error: ""
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
          state.loading = true
        },
        [getUsers.fulfilled]: (state, action) => {
          state.loading = false
          state.users = action.payload
          state.error = ""
        },
        [getUsers.rejected]: (state, action) => {
          state.loading = false
          state.users = []
          state.error = action.error.message
        },
      },
})


export default usersSlice.reducer;