import {createMessage, getRoomMessages} from "./messagesService.js";


export const fetchRoomMessages = async (room_id) => {
    return await getRoomMessages(room_id);
}


export const sendMessage = async (messageData) => {
    return await createMessage(messageData);
}