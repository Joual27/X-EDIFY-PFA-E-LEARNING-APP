import {getAdminStats, getAdminUsers} from "./adminService.js";


export const fetchAdminUsers = async ()=> {
    return await getAdminUsers();
}
export const fetchAdminStats = async ()=> {
    return await getAdminStats();
}
