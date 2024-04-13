import instance from "../../services/api/instance.js";


export const registerAsStudent = async (student) => {
    try{
        const response = await instance.post('/register/student',student);
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const registerAsInstructor = async (instructor) => {
    try{
        const response = await instance.post('/register/instructor',instructor);
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const authenticate = async (credentials) => {
    try{
        const response = await instance.post('login',credentials);
        return response
    }
    catch (error) {
        console.log(error)
        throw error
    }
}