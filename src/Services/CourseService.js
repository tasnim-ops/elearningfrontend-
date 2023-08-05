import Axios from "../Axios/Api";

const Course_Api="/course"

export const fetchCourses=async()=>{
    return await Axios.get(Course_Api);
}

export const fetchCourseById=async(courseId)=>{
    return await Axios.get(Course_Api + '/'+ courseId);
}

export const delCourse=async(courseId)=>{
    return await Axios.delete(Course_Api +'/'+ courseId);
}

export const addCourse=async(course)=>{
    return await Axios.post(Course_Api,course);
}

export const editCourse = ( course) => {
    return  Axios.put(Course_Api + '/' + course.courseId, course);
};