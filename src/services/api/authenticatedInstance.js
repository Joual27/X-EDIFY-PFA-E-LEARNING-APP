import axios from "axios";

const authenticatedInstance = axios.create({
    baseURL: "http://localhost/api",
    headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    crossDomain: true,
});

export const authenticatedFormInstance = axios.create({
    baseURL: "http://localhost/api",
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    crossDomain: true,
});


export default authenticatedInstance;