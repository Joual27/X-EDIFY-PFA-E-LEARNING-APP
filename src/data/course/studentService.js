import instance from "../../services/api/instance.js";

export const getCoursesOfStudent = async (student_id,page) => {
    try{
        return await instance.get(`student/courses/${student_id}?page=${page}`);
    }
    catch (error){
        console.log(error)
        throw error
    }
}

export const accessCourse = async (course_id,student_id) => {
    try {
        let req = {
            course_id : course_id,
            student_id : student_id
    }
        return await instance.post('/course/enroll',req);
    }
    catch (error){
        console.log(error)
        throw error
    }
}
export const getEnrollmentData = async (course_id,student_id) => {
    try{
        let req = {
            course_id : course_id,
            student_id : student_id
        }
        return await instance.post('/enrollment/data',req);
    }
    catch (error){
        console.log(error)
        throw error
    }
}



export const getPointsOfStudent = async (course_id,student_id) => {
    try{
        return await instance.get(`/course/${course_id}/student/${student_id}/points`);
    }
    catch (error){
        console.log(error)
        throw error
    }
}
export const changePointsOfStudent = async (course_id,student_id) => {
    try{
        let req = {
            course_id : course_id,
            student_id :student_id
        }
        return await instance.post('/student/points/update',req);
    }
    catch (error){
        console.log(error)
        throw error
    }
}


export const makeReview = async (reviewData) => {
    try{
        return await instance.post('/course/review/create',reviewData)
    }
    catch (error){
        console.log(error)
        throw error
    }
}


export const setCourseCompleted = async (course_id,student_id) => {
    try{
        let req = {
            course_id : course_id,
            student_id : student_id
        }
        return await instance.post('/course/completed/finalize',req)
    }
    catch (error){
        console.log(error)
        throw error
    }
}


export const checkCourseCompleted = async (course_id,student_id) => {
    try{
        return await instance.get(`course/completed/${course_id}/${student_id}`);
    }
    catch (error){
        console.log(error)
        throw error
    }
}



export const getRatingData = async (course_id) => {
    try{
        return await instance.get(`course/${course_id}/reviews/data`);
    }
    catch (error){
        console.log(error)
        throw error
    }
}
export const changeProfileData = async (newData) => {
    try{
        return await instance.post('/profile/update',newData, { headers : {
                'Content-Type': 'multipart/form-data'
            }});
    }
    catch (error){
        console.log(error)
        throw error
    }
}