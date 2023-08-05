import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addCourse, delCourse, editCourse, fetchCourses, fetchCourseById } from "../Services/CourseService";



export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetchCourses();
      return res.data;
    } catch (errorCourse) {
      return rejectWithValue(errorCourse.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (course, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await addCourse(course);
      return res.data;
    } catch (errorCourse) {
      return rejectWithValue(errorCourse.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await delCourse(id);
      thunkAPI.dispatch(deleteCourseSuccess()); // Dispatch an action to set successCourse to true
      return id;
    } catch (errorCourse) {
      return rejectWithValue(errorCourse.message);
    }
  }
);


export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async (course, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await editCourse(course);
      thunkAPI.dispatch(updateCourseSuccess()); // Dispatch an action to set successCourse to true
      return res.data;
    } catch (errorCourse) {
      return rejectWithValue(errorCourse.message);
    }
  }
);


export const findCourseById = createAsyncThunk(
  "course/findCourseById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetchCourseById(id);
      return res.data;
    } catch (errorCourse) {
      return rejectWithValue(errorCourse.message);
    }
  }
);

export const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    course: {},
    isLoadingCourse: false,
    successCourse: null,
    errorCourse: null,
  },
  reducers: {
     updateCourseSuccess: (state) => {
      state.successCourse = true;
    },
    deleteCourseSuccess: (state) => {
      state.successCourse = true;
    },
  },
  extraReducers: (builder) => {
    // get courses
    builder
      .addCase(getCourses.pending, (state, action) => {
        state.isLoadingCourse = true;
        state.errorCourse = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoadingCourse = false;
        state.errorCourse = null;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoadingCourse = false;
        console.log("Can not connect to server")
      })

      // insert course
      .addCase(createCourse.pending, (state, action) => {
        state.isLoadingCourse = true;
        state.errorCourse = null;
        state.successCourse = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
        state.isLoadingCourse = false;
        state.errorCourse = null;
        state.successCourse = true;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoadingCourse = false;
        state.errorCourse = action.payload;
        state.successCourse = false;
      })

      // modify course
      .addCase(updateCourse.pending, (state, action) => {
        state.isLoadingCourse = true;
        state.errorCourse = null;
        state.successCourse = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.isLoadingCourse = false;
        state.errorCourse = null;
        state.successCourse = true;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoadingCourse = false;
        state.errorCourse = action.payload;
        state.successCourse = false;
      })

      // delete course
      .addCase(deleteCourse.pending, (state, action) => {
        state.isLoadingCourse = true;
        state.errorCourse = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoadingCourse = false;
        state.errorCourse = null;
        state.courses = state.courses.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoadingCourse = false;
        state.errorCourse = action.payload;
        state.successCourse = false;
      })

      // fetch course
      .addCase(findCourseById.pending, (state, action) => {
        state.isLoadingCourse = true;
        state.errorCourse = null;
      })
      .addCase(findCourseById.fulfilled, (state, action) => {
        state.isLoadingCourse = false;
        state.errorCourse = null;
        state.course = action.payload;
      })
      .addCase(findCourseById.rejected, (state, action) => {
        state.isLoadingCourse = false;
        state.errorCourse = action.payload;
      })

;
      
  }
});
export const { updateCourseSuccess, deleteCourseSuccess } = courseSlice.actions;
export default courseSlice.reducer;
