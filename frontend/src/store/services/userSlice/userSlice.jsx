import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"user", 
    initialState:{
        name: "",
        role: "",
    },
    reducers: {
        login: (state, action)=>{
            state.name = action.payload
            state.role = action.payload
        }
    }
})

export const { login } = userSlice.actions
export default userSlice.reducer