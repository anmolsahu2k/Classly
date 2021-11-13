<<<<<<< HEAD
import * as api from '../api';
import { JOIN_VIDEO_CALL } from '../constants/actionTypes';

export const joincall = (roomId) => async (dispatch) => {
    try {
        const { data } = await api.joincall(roomId);
        console.log(data, "helelllllssldahjavsfa")
        dispatch({ type: JOIN_VIDEO_CALL, data });
    } catch (error) {
        console.log(error);
    }
=======
import * as api from '../api';
import { JOIN_VIDEO_CALL } from '../constants/actionTypes';

export const joincall = (roomId) => async (dispatch) => {
    try {
        const { data } = await api.joincall(roomId);
        console.log(data, "helelllllssldahjavsfa")
        dispatch({ type: JOIN_VIDEO_CALL, data });
    } catch (error) {
        console.log(error);
    }
>>>>>>> f7bf24f500655cc46873323ac4189f72e9663e89
}