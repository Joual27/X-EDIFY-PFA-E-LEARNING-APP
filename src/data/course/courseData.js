import {addChapter, addCourse, bringCourseOnCreation} from "./courseService.js";


export const createCourse = async (course) => {
    return await addCourse(course);
}
export const fetchCourseOnCreation = async (publisher_id) => {
    return await bringCourseOnCreation(publisher_id);
}

export const createChapter = async (chapter) => {
    return await addChapter(chapter);
}