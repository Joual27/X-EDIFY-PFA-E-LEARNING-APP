import axios from "axios";

const authenticatedInstance = axios.create({
    baseURL : 'http://localhost/api',
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    crossDomain: true
});

export default authenticatedInstance