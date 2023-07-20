import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {fetchTeacherById,fetchTeachers,addTeacher,editTeacher,delTeacher} from '../Services/TeacherService'

export const getTeachers = createAsyncThunk(
    "teacher/getTeachers",
    async(_, thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            const res = await fetchTeachers();
            return res.data;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);
export const createTeacher=createAsyncThunk(
    "teacher/createTeacher",
    async(teacher,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            const res=await addTeacher(teacher);
        return res.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
) ;

export const deleteTeacher=createAsyncThunk(
    "teacher,deleteTeacher",
    async(id,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            await delTeacher(id);
            return id;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

export const updateTeacher = createAsyncThunk(
    "teacher/updateTeacher",
    async (teacher, thunkAPI) => { 
        const { rejectWithValue } = thunkAPI;
        try{ 
            const res= await editTeacher(teacher);
            return res.data
        }catch (error) { 
            return rejectWithValue(error.message);
        }
    }
);

export const findTeacherByID=createAsyncThunk(
    "teacher/findTeacherByID",
    async(id,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            const res = await fetchTeacherById(id);
            return res.data;
        }catch(error){
            return rejectWithValue(error.data);
        }    
    }
);


export const teacherSlice=createSlice({
    name:'teacher',
    initialState:{
        teachers:[],
        teacher:{},
        isLoading:false,
        success:null,
        error:null,
    },
    extraReducers:(builder)=>{
        //get teachers
        builder
        .addCase(getTeachers.pending,(state,action)=>{
            state.isLoading=true;
            state.error=null;
        })
        .addCase(getTeachers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.error = null;
            state.teachers=action.payload;
            state.teacher=action.payload;

        })
        .addCase(getTeachers.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
            console.log("can not connect to server")
        })
        //insert teacher 
        .addCase(createTeacher.pending, (state, action) => {
            state.isLoading=true;
            state.error=null;
            state.success=null;
        })
        .addCase(createTeacher.fulfilled, (state, action) => {
            state.teachers.push(action.payload);
            state.isLoading=false;
            state.error=null;
            state.success=action.payload;
        })
            .addCase(createTeacher.rejected, (state, action) => {
            state.isLoading=false;
            state.error=action.payload;
            state.success=null;
        })
        //Modification teacher
            .addCase(updateTeacher.pending, (state, action) => {
            state.isLoading=true;
            state.error=null; 
            state.success=null; 
        })
            .addCase(updateTeacher.fulfilled, (state, action) => { 
            state.teachers = state.teachers.map((item) =>
            item._id === action.payload._id ? action.payload : item
            ); 
            state.isLoading=false;
            state.error=null; 
            state.success=action.payload;
        })
        //delete teacher
        .addCase(deleteTeacher.pending,(state,action)=>{
            state.isLoading=true;
            state.error=null; 
        })
        .addCase(deleteTeacher.fulfilled, (state, action) => {
            state.isLoading=false;
            state.error=null; 
            state.teachers=state.teachers.filter((item)=> item._id!==action.payload)
        })
        .addCase(deleteTeacher.rejected, (state, action) => {
            state.isLoading=false;
            state.error=action.payload; 
        })
        //fetch teacher 
        .addCase(findTeacherByID.pending, (state, action) => {
            state.isLoading = true
            state.error=null; 
        })
        .addCase(
            findTeacherByID.fulfilled,(state, action) => {
            state.isLoading = false
            state.error = null
            state.teacher=action.payload;
        })  
    }
})

export default teacherSlice.reducer;