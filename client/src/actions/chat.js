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
        await api.getChatResponse();
        dispatch({ type: GET_CHAT });
    } catch (error) {
        console.log(error);
    }
}


export const appendChat = (chatData) => async (dispatch) => {
    try {
        let currentUser = JSON.parse(localStorage.getItem('profile')).result
        chatData['from'] = currentUser.email
        await api.appendChat(chatData);
        let localChatData = JSON.parse(localStorage.getItem('chatData'))
        if (localChatData) {
            localChatData.push(chatData)
            localStorage.setItem('chatData', JSON.stringify(localChatData))

        }
        else {
            localStorage.setItem('chatData', JSON.stringify([chatData]))
        }
        dispatch({ type: APPEND_CHAT, data: chatData });
        console.log("hhhhhhhhhh")
    } catch (error) {
        console.log(error);
    }
}