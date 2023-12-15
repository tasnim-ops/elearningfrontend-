import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  addCategory,
  delCategory,
  editCategory,
  fetchCategories,
  fetchCategoryById,
} from "../Services/CategoryService";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetchCategories();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await addCategory(category);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await delCategory(id);
      thunkAPI.dispatch(deleteCategorySuccess()); // Dispatch an action to set success to true
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category, thunkAPI) => {
    //console.log("now hear", category.id);
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await editCategory(category);
      return res.data;
    } catch (error) {
      //console.error("An error occurred while updating the category:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }
);

export const findCategoryById = createAsyncThunk(
  "category/findCategoryById",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetchCategoryById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: {},
    isLoading: false,
    success: null,
    error: null,
  },
  reducers: {
    updateCategorySuccess: (state) => {
      state.success = true;
    },
    deleteCategorySuccess: (state) => {
      state.success = true;
    },
  },
  extraReducers: (builder) => {
    // get categories
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        //console.log("Can not connect to server");
      })

      // insert category
      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // modify category
      .addCase(updateCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.isLoading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // delete category
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categories = state.categories.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      // fetch category
      .addCase(findCategoryById.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findCategoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.category = action.payload;
      })
      .addCase(findCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { updateCategorySuccess, deleteCategorySuccess } =
  categorySlice.actions;
export default categorySlice.reducer;
