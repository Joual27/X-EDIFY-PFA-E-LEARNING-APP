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

export const getAdminCategories = async () => {
    try{
        return await instance.get(  '/admin/categories/all');
    }
    catch (error){
        console.log(error)
        throw error
    }
}


export const addCategory = async (course_name) => {
    try{
        let req = {
            name : course_name
        }
        return await instance.post('/admin/category/create',req);
    }
    catch (error){
        console.log(error)
        throw error
    }
}

export const getCategoryToUpdateData = async (category_id) => {
    try{
        return await instance.get(`/admin/category/${category_id}/data`);
    }
    catch (error){
        console.log(error)
        throw error
    }
}

export const editCategory = async (categoryData) => {
    try{
        let req = {
            name : categoryData.name
        }
        return await instance.post(`/admin/category/${categoryData.id}/update`,req)
    }
    catch (error){
        console.log(error)
        throw error
    }
}


export const removeCategory = async (id) =>{
    try{
        return await instance.delete(`/admin/category/${id}/delete`);
    }
    catch (error){
        console.log(error)
        throw error
    }
}


export const denyUserAccess = async (id) => {
    try{
        return await instance.put(`/admin/user/${id}/ban`);
    }
    catch (error){
        console.log(error)
        throw error
    }
}