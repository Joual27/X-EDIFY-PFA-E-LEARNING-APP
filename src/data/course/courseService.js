import authenticatedInstance from "../../services/api/authenticatedInstance.js";


export const addCourse = async (course) => {
   try{
       const config = {
           headers: {
               'content-type': 'multipart/form-data'
           }
       };
       return await authenticatedInstance.post('/course/create',course,config);
   }
   catch (error){
       console.log(error);
       throw error
   }
}

export const bringCourseOnCreation = async (publisher_id) => {
    try{
        return await authenticatedInstance.get(`/course/data/${publisher_id}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const addChapter = async (chapter) => {
    try{
        return await authenticatedInstance.post('/chapter/create',chapter);
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const addTopic = async (topic) => {
    try{
        return await authenticatedInstance.post('/topic/create',topic);
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const removeChapter = async (id) => {
    try {
        return await authenticatedInstance.delete(`/chapter/delete/${id}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}
export const removeTopic = async (id) => {
    try {
        return await authenticatedInstance.delete(`/topic/delete/${id}`);
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
        return await authenticatedInstance.post('/content/create',contentData,config);
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
        return await authenticatedInstance.post('/course/post',req);
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const getCoursesOfOInstructor = async (instructor_id,page) => {
    try {
        return await authenticatedInstance.get(`/instructor/${instructor_id}/courses?page=${page}`)
    }
    catch (error){
        console.log(error);
        throw error
    }
}

export const removeCourse = async (course_id) => {
    try {
        return await authenticatedInstance.delete(`/course/delete/${course_id}`);
    }
    catch (error){
        console.log(error);
        throw error
    }
}


export const getAllCourses = async (page) => {
    try {
        return await authenticatedInstance.get(`/courses/public/all?page=${page}`);
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
        return await authenticatedInstance.post(`courses/filter?page=${page}`,req);
    }
    catch (error){
        console.log(error);
        throw error
    }
}