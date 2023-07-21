import { configureStore } from "@reduxjs/toolkit";
import categorySlice from"../features/categorySlice";
import teacherSlice from "../features/teacherSlice";
import authSlice  from "../features/authSlice";

const store = configureStore({
    reducer:{
        category: categorySlice,
        teacher:teacherSlice,
        auth:authSlice
    }
})
export default store; 
