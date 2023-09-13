import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {fetchStudentById,fetchStudents,addStudent,editStudent,delStudent} from '../Services/StudentService';

export const getStudents = createAsyncThunk(
    "student/getStudents",
    async (_, thunkAPI) => {
      console.log('Début de l\'action getStudents');
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetchStudents();
        console.log('Résultat de fetchStudents:', res);
        return res.data;
      } catch (error) {
        console.error('Erreur dans getStudents:', error);
        return rejectWithValue(error.message);
      }
    }
  );
  
export const createStudent=createAsyncThunk(
    "student/createStudent",
    async(student,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            const res=await addStudent(student);
        return res.data
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
) ;

export const deleteStudent=createAsyncThunk(
    "student/deleteStudent",
    async(id,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            await delStudent(id);
            return id;
        }catch(error){
            return rejectWithValue(error.message);
        }
    }
);

export const updateStudent = createAsyncThunk(
    "student/updateStudent",
    async (student, thunkAPI) => { 
        const { rejectWithValue } = thunkAPI;
        try{ 
            const res= await editStudent(student);
            return res.data
        }catch (error) { 
            return rejectWithValue(error.message);
        }
    }
);

export const findStudentByID=createAsyncThunk(
    "student/findStudentByID",
    async(id,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI;
        try{
            const res = await fetchStudentById(id);
            return res.data;
        }catch(error){
            return rejectWithValue(error.data);
        }    
    }
);


export const studentSlice=createSlice({
    name:'student',
    initialState:{
        students:[],
        student:{},
        isLoading:false,
        success:null,
        error:null,
    },
    extraReducers:(builder)=>{
        //get students
        builder
        .addCase(getStudents.pending,(state,action)=>{
            state.isLoading=true;
            state.error=null;
        })
        .addCase(getStudents.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.error = null;
            state.students=action.payload;
            state.student=action.payload;

        })
        .addCase(getStudents.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
            console.log("can not connect to server")
        })
        //insert student 
        .addCase(createStudent.pending, (state, action) => {
            state.isLoading=true;
            state.error=null;
            state.success=null;
        })
        .addCase(createStudent.fulfilled, (state, action) => {
            state.students.push(action.payload);
            state.isLoading=false;
            state.error=null;
            state.success=action.payload;
        })
            .addCase(createStudent.rejected, (state, action) => {
            state.isLoading=false;
            state.error=action.payload;
            state.success=null;
        })
        //Modification student
            .addCase(updateStudent.pending, (state, action) => {
            state.isLoading=true;
            state.error=null; 
            state.success=null; 
        })
            .addCase(updateStudent.fulfilled, (state, action) => { 
            state.students = state.students.map((item) =>
            item._id === action.payload._id ? action.payload : item
            ); 
            state.isLoading=false;
            state.error=null; 
            state.success=action.payload;
        })
        //delete student
        .addCase(deleteStudent.pending,(state,action)=>{
            state.isLoading=true;
            state.error=null; 
        })
        .addCase(deleteStudent.fulfilled, (state, action) => {
            state.isLoading=false;
            state.error=null; 
            state.students=state.students.filter((item)=> item._id!==action.payload)
        })
        .addCase(deleteStudent.rejected, (state, action) => {
            state.isLoading=false;
            state.error=action.payload; 
        })
        //fetch student 
        .addCase(findStudentByID.pending, (state, action) => {
            state.isLoading = true
            state.error=null; 
        })
        .addCase(
            findStudentByID.fulfilled,(state, action) => {
            state.isLoading = false
            state.error = null
            state.student=action.payload;
        })  
    }
})

export default studentSlice.reducer;