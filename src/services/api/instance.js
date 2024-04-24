import axios from "axios";

const instance = axios.create({
    baseURL : 'http://localhost/api',
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export default instance