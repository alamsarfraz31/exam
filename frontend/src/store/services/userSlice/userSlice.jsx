import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchUser = createAsyncThunk("fetchUser",
    async ()=>{
        const session = localStorage.getItem("token")
        const data = await axios.post(import.meta.env.VITE_API+"/user", {token: session})
        return await data.json();
    }
)

export const userSlice = createSlice({
    name:"user", 
    initialState:{
        loading: false,
        user: [],
        error: "",
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchUser.pending, (state, action)=>{
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action)=>{
            state.loading = false;
            state.user = action.payload
        })
        builder.addCase(fetchUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const { login } = userSlice.actions
export default userSlice.reducer