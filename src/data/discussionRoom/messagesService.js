import instance from "../../services/api/instance.js";


export const getRoomMessages = async (room_id) => {
    try{
        return await  instance.get(`/room/${room_id}/messages`)
    }
    catch (error){
        console.log(error)
        throw error
    }
}


export const createMessage = async (messageData) => {
   try{
       return await instance.post('/message/send',messageData);
   }
   catch (error){
       console.log(error)
       throw error
   }
}