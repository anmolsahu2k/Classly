import { GET_CHAT, APPEND_CHAT } from '../constants/actionTypes';

const chatReducer = (chatArray = [], action) => {
    switch (action.type) {
        case GET_CHAT:
            return
        case APPEND_CHAT:
            console.log("ssssssssssss", action?.data)
            return [...chatArray, action?.data];
        default:
            return chatArray;
    }
};

export default chatReducer;