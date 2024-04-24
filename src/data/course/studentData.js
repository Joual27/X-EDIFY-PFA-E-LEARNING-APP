import {
    accessCourse,
    changePointsOfStudent, changeProfileData, checkCourseCompleted,
    getCoursesOfStudent,
    getEnrollmentData,
    getPointsOfStudent, getRatingData, makeReview, setCourseCompleted
} from "./studentService.js";



export const fetchCoursesOfStudent = async (student_id,page)  => {
    return await getCoursesOfStudent(student_id,page);
}

export const enrollCourse = async (course_id,student_id) => {
    return await accessCourse(course_id,student_id);
}

export const fetchEnrollmentData = async (course_id,student_id) => {
    return await getEnrollmentData(course_id,student_id);
}

export const fetchPointsOfStudent = async (course_id,student_id) => {
    return await getPointsOfStudent(course_id,student_id);
}

export const updatePointsOfStudent = async (course_id,student_id) => {
    return await changePointsOfStudent(course_id,student_id);
}


export const createReview = async (reviewData) => {
     return await makeReview(reviewData);
}

export const markCourseAsCompleted = async (course_id,student_id) => {
    return await setCourseCompleted(course_id,student_id);
}

export const isCourseCompleted = async (course_id,student_id) => {
    return await checkCourseCompleted(course_id,student_id);
}

export const fetchRatingData = async (course_id) => {
    return await getRatingData(course_id);
}

export const updateProfileData = async (newData) => {
    return await changeProfileData(newData);
}