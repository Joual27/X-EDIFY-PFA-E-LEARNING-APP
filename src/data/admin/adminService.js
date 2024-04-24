import instance from "../../services/api/instance.js";


export const getAdminStats = async ()=>{
    try{
        return await instance.get('/admin/stats');
    }
    catch (error){
        console.log(error)
        throw error
    }
}
export const getAdminUsers = async ()=>{
    try{
        return await instance.get('/admin/users/all');
    }
    catch (error){
        console.log(error)
        throw error
    }
}