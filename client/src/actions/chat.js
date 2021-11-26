import * as api from '../api';

import { GET_CHAT, APPEND_CHAT } from '../constants/actionTypes';

// export const sendchat = (message, history) => async (dispatch) => {
//     try {
//         console.log(formData)
//         const { data } = await api.signUp(formData);
//         dispatch({ type: AUTH, data });
//         history.push('/home');

//     } catch (error) {
//         console.log(error);
//     }
// }


export const getChat = () => async (dispatch) => {
    try {
        console.log('sdf')
        const { data } = await api.getChatResponse();
        dispatch({ type: GET_CHAT, data });
    } catch (error) {
        console.log(error);
    }
}


export const appendChat = (chatData) => (dispatch) => {
    try {
        // const { data } = await api.appendChat(chatData);
        dispatch({ type: APPEND_CHAT, data: chatData });
    } catch (error) {
        console.log(error);
    }
}