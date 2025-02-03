 import {configureStore} from "@reduxjs/toolkit"
 import userReducer from "./services/userSlice/userSlice"
 export default configureStore({
    reducer: {
      user: userReducer,
    }
 })