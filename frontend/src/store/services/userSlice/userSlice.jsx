import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user", 
    initialState:{
        name: "",
        role: "",
    },
    reducers: {
        name: (state, action)=>{
            state.name = action.payload
        },
        role: (state, action)=>{
            state.role = action.payload
        }
    }
})

export const { login } = userSlice.actions
export default userSlice.reducer