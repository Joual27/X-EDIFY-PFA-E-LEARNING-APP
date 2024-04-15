import authenticatedInstance from "../../services/api/authenticatedInstance.js";


export const getAllCategories = async () => {
     try{
         return await authenticatedInstance.get('/categories/all');
     }
     catch (error) {
         console.log(error)
         throw error
     }
}