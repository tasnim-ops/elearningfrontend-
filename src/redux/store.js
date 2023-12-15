// Import necessary dependencies
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

// Import slices
import categorySlice from "../features/categorySlice";
import teacherSlice from "../features/teacherSlice";
import authSlice from "../features/authSlice";
import courseSlice from "../features/courseSlice";
import studentSlice from "../features/studentSlice";
import contactSlice from "../features/contactSlice";
import conferenceSlice from "../features/conferenceSlice";
// Configure persistence
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Wrap authSlice with persistence
const persistedReducer = persistReducer(persistConfig, authSlice);

// Configure store
const store = configureStore({
  reducer: {
    category: categorySlice,
    teacher: teacherSlice,
    auth: persistedReducer,
    course: courseSlice,
    student: studentSlice,
    contact: contactSlice,
    conference: conferenceSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

// Export store
export default store;
//
//In this code, we import the necessary dependencies and slices. We configure persistence by creating a `persistConfig` object. We then wrap the `authSlice` with persistence using the `persistReducer` function.
//
//Next, we configure the store by passing the `reducer` object and the `middleware` function to the `configureStore` function. The `reducer` object contains all the slices, and the `middleware` function includes the `logger` middleware for logging actions.
//
//Finally, we export the store for use in the application..</s>
