import authenticatedInstance from "../../services/api/authenticatedInstance.js";


export const addCourse = async (course) => {
   try{
       return await authenticatedInstance.post('/course/create',course);
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
    
}