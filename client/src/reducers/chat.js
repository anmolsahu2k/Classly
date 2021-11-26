import { GET_CHAT } from '../constants/actionTypes';

const chatReducer = (state = { chatData: {} }, action) => {
    switch (action.type) {
        case GET_CHAT:
            localStorage.setItem('chatData', JSON.stringify({ ...action?.data }));
            return { ...state, chatData: action?.data };
        default:
            return state;
    }
};

export default chatReducer;