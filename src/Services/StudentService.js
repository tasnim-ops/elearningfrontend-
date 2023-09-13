import axios from '../Axios/Api';
const Student_Api="student"

export const fetchStudents= async()=>{
    return await axios.get(Student_Api);
}

export const fetchStudentById=async(studentId)=>{
    return await axios.get(Student_Api + '/' + studentId);
}

export const delStudent=async(studentId)=>{
    return await axios.delete(Student_Api +'/' + studentId);
}

export const addStudent=async(student)=>{
    return await axios.post(Student_Api,student);
}

export const editStudent=(_id,student)=>{
    return axios.put(Student_Api+'/'+ _id,student);
}