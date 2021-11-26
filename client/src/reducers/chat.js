import { GET_CHAT, APPEND_CHAT } from '../constants/actionTypes';

const chatReducer = (chatArray = [], action) => {
    switch (action.type) {
        case GET_CHAT:
            localStorage.setItem('chatArray', JSON.stringify(...action?.data));
            return action?.data;
        case APPEND_CHAT:
            return [...chatArray, action?.data];
        default:
            return chatArray;
    }
};

export default chatReducer;