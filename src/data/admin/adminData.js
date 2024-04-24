import {
    addCategory, denyUserAccess, editCategory,
    getAdminCategories,
    getAdminStats,
    getAdminUsers,
    getCategoryToUpdateData, removeCategory
} from "./adminService.js";


export const fetchAdminUsers = async ()=> {
    return await getAdminUsers();
}
export const fetchAdminStats = async ()=> {
    return await getAdminStats();
}

export const fetchAdminCategories = async() => {
    return await getAdminCategories();
}


export const createCategory = async (category_name) => {
    return await addCategory(category_name);
}


export const fetchCategoryToUpdateData = async (category_id) => {
    return await getCategoryToUpdateData(category_id);
}


export const updateCategory = async (categoryData) => {
    return await editCategory(categoryData);
}

export const deleteCategory = async (id) => {
    return await removeCategory(id);
}


export const banUser = async (id) => {
    return await denyUserAccess(id);
}