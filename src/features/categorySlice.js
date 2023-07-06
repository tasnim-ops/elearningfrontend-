import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {addCategory,delCategotegory,editCategory,fetchCategories,fetchCategoryById} from "../Services/CategoryService"


export const getCategories=createAsyncThunk(
    "category/getCategory",
    async(_,thunkApi)=>{
        const {rejectWithValue}=thunkApi;
        try{
            const res = await fetchCategories();
            return res.data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);
export const createCategory= createAsyncThunk(
    "category/createCategory",
    async (category, thunkAPI)=>{
        const {rejectWithValue} = thunkAPI;
        try{
            const res = await addCategory(category);
            return res.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);
export const deleteCategory= createAsyncThunk(
    "category/deleteCategory",
    async(id,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            await delCategotegory(id);
            return id;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

export const updateCategory= createAsyncThunk(
    "category/updateCategory",
    async(category,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            const res= await editCategory(category);
            return res.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

export const findCategoryById= createAsyncThunk(
    "category/findCategoryById",
    async(id,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
        const res = await fetchCategoryById(id);
        return res.data;   
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
    
);

export const categorySlice = createSlice({
    name:'category',
    initialState:{
        categories:[],
        category:{},
        isLoading:false,
        success:null,
        error:null,
    },
    extraReducers:(builder)=>{
        //get categories
        builder
        .addCase(getCategories.pending,(state,action)=>{
            state.isLoading=true;
            state.error=null;
        })
        .addCase(getCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.error=null;
            state.categories=action.payload;
        })
        .addCase(getCategories.rejected,(state,action)=>{
            state.isLoading=false;
            console.log("impossible de se connecter au serveur")
        })

        //insert category
        .addCase(createCategory.pending,(state,action)=>{
            state.isLoading=true;
            state.error=null;
            state.success=null;
        })
        .addCase(createCategory.fulfilled,(state,action)=>{
            state.categories.push(action.payload);
            state.isLoading=false;
            state.error=null;
            state.success=action.payload;
        })
        .addCase(createCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
            state.success=null;
        })

        //modify category
        .addCase(updateCategory.pending,(state,action)=>{
            state.isLoading=true;
            state.error=null;
            state.success=null;
        })
        .addCase(updateCategory.fulfilled,(state,action)=>{
            state.categories=state.categories.map((item)=>
            item._id===action.payload? action.payload : item
            );    
            state.isLoading=false;
            state.error=null;
            state.success=action.payload;
        })

      //delete category
        .addCase(deleteCategory.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.categories = state.categories.filter((item) => item._id !== action.payload);
        })
        .addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        //fetch category
        .addCase(findCategoryById.pending,(state,action)=>{
            state.isLoading=true;
            state.error=null;
        })
        .addCase(findCategoryById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.error=null;
            state.category=action.payload;
        })
    }
})

export default categorySlice.reducer;