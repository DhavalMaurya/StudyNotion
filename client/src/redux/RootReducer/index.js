import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import profileSlice from "../slices/profileSlice";
import courseSlice from "../slices/courseSlice";

const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileSlice,
    course : courseSlice,
})

export default rootReducer;