import instance from "../../services/api/instance.js";


export const getAllCategories = async () => {
     try{
         return await instance.get('/categories/all');
     }
     catch (error) {
         console.log(error)
         throw error
     }
}