import {
    authenticate,
    getAuthenticatedUser,
    registerAsInstructor,
    registerAsStudent,
    signOut
} from "./authenticationService.js";


export const signUpAsStudent = async (student) => {
    const response = await registerAsStudent(student);
    return response
}


export const signUpAsInstructor = async (instructor) => {
    const response = await registerAsInstructor(instructor);
    return response
}

export const signIn = async (credentials) => {
    const response = await authenticate(credentials);
    return response;
}


export const logout = async () => {
    return await signOut();
}

export const fetchAuthenticatedUser = async () =>{
    return await getAuthenticatedUser();
}