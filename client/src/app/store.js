import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./../data/currentUser/currentUserSlice"

export const store=configureStore({
    reducer:{
     user:userReducer,
    }
})