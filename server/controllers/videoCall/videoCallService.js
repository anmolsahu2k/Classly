import request from 'request';

export const getRoom = (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            request(options, (error, response) => {
                if (error) throw new Error(error);
                console.log(response.body);
            });;
            resolve(response.body);
        } catch (error) {
            reject(error);
        }
    });
};

export const createRoom = (options) => {
    return new Promise(async (resolve, reject) => {
        try {
            request(options, (error, response) => {
                if (error) throw new Error(error);
                console.log(response.body);
            });;
            resolve(response.body);
        } catch (error) {
            reject(error);
        }
    });
};