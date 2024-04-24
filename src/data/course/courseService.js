import authenticatedInstance from "../../services/api/authenticatedInstance.js";
import instance from "../../services/api/instance.js";


export const addCourse = async (course) => {
   try{
       const config = {
           headers: {
               'content-type': 'multipart/form-data'
           }
       };
       return await instance.post('/course/create',course,config);
   }
   catch (error){
       console.log(error);
       throw error
   }
}

export const bringCourseOnCreation = async (publisher_id) => {
    try{
        return await instance.get(`/course/data/${publisher_id}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const addChapter = async (chapter) => {
    try{
        return await instance.post('/chapter/create',chapter);
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const addTopic = async (topic) => {
    try{
        return await instance.post('/topic/create',topic);
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const removeChapter = async (id) => {
    try {
        return await instance.delete(`/chapter/delete/${id}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}
export const removeTopic = async (id) => {
    try {
        return await instance.delete(`/topic/delete/${id}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const addContent = async (contentData) => {
    try{
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return await instance.post('/content/create',contentData,config);
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const uploadCourse = async (publisher_id) => {
    let req = {
        publisher_id : publisher_id
    }
    try {
        return await instance.post('/course/post',req);
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const getCoursesOfOInstructor = async (instructor_id,page) => {
    try {
        return await instance.get(`/instructor/${instructor_id}/courses?page=${page}`)
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const removeCourse = async (course_id) => {
    try {
        return await instance.delete(`/course/delete/${course_id}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const getAllCourses = async (page) => {
    try {
        return await instance.get(`/courses/public/all?page=${page}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const getCourseByTerm = async (term,page) => {
    try {
        let req = {
            term : term
        }
        return await instance.post(`courses/filter?page=${page}`,req);
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const getTopCategories = async () => {
    try {
        return await instance.get('/categories/top/3');
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const getCoursesOfCategory = async (category_id,page) => {
    try {
        return await instance.get(`/category/courses/${category_id}?page=${page}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const getCourseData = async (course_id) => {
    try {
        return await instance.get(`course/details/${course_id}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}