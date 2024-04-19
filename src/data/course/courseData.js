import {
    addChapter,
    addContent,
    addCourse,
    addTopic,
    bringCourseOnCreation, getAllCourses, getCourseByTerm, getCoursesOfOInstructor,
    removeChapter, removeCourse,
    removeTopic, uploadCourse
} from "./courseService.js";



export const createCourse = async (course) => {
    return await addCourse(course);
}
export const fetchCourseOnCreation = async (publisher_id) => {
    return await bringCourseOnCreation(publisher_id);
}
export const createChapter = async (chapter) => {
    return await addChapter(chapter);
}
export const createTopic = async (topic) => {
    return await addTopic(topic)
}

export const deleteChapter = async (id) => {
    return await removeChapter(id)
}
export const deleteTopic = async (id) => {
    return await removeTopic(id)
}

export const createContent = async (contentData) => {
    return await addContent(contentData)
}

export const postCourse = async (publisher_id) => {
    return await uploadCourse(publisher_id);
}

export const fetchCoursesOfInstructor = async (instructor_id,page) => {
    const res = await getCoursesOfOInstructor(instructor_id,page)
    console.log(res)
    return res;
}

export const deleteCourse = async (course_id) => {
    return await removeCourse(course_id);
}

export const fetchAllCourses = async (page) => {
    return await getAllCourses(page);
}


export const filterCourses = async (term,page) => {
    return await getCourseByTerm(term,page);
}