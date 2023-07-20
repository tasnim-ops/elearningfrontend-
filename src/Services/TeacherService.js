import axios from '../Axios/Api';
const Teacher_Api="teacher"

export const fetchTeachers= async()=>{
    return await axios.get(Teacher_Api);
}

export const fetchTeacherById=async(teacherId)=>{
    return await axios.get(Teacher_Api + '/' + teacherId);
}

export const delTeacher=async(teacherId)=>{
    return await axios.delete(Teacher_Api +'/' + teacherId);
}

export const addTeacher=async(teacher)=>{
    return await axios.post(Teacher_Api,teacher);
}

export const editTeacher=(_id,teacher)=>{
    return axios.put(Teacher_Api+'/'+ _id,teacher);
}