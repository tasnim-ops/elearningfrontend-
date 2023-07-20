import { configureStore } from "@reduxjs/toolkit";
import categorySlice from"../features/categorySlice";
import teacherSlice from "../features/teacherSlice";
const store = configureStore({
    reducer:{
        category: categorySlice,
        teacher:teacherSlice,
    }
})
export default store; 
