import request from 'request';

export const getRoom = (options) => {
    return new Promise(async (resolve, reject) => {
<<<<<<< HEAD
        try {
            request(options, (error, response) => {
                if (error) throw new Error(error);
                console.log(response.body);
            });;
            resolve(response.body);
        } catch (error) {
            reject(error);
        }
=======
        request(options, (error, response) => {
            if (error) throw new Error(error);
            try {
                console.log(response.body);
                resolve(response.body);
            } catch (error) {
                reject(error);
            }

        });
>>>>>>> 7179377c18284b5b7735a5680893657c93633221
    });
};

export const createRoom = (options) => {
    return new Promise(async (resolve, reject) => {
<<<<<<< HEAD
        try {
            request(options, (error, response) => {
                if (error) throw new Error(error);
                console.log(response.body);
            });;
            resolve(response.body);
        } catch (error) {
            reject(error);
        }
=======
        request(options, (error, response) => {
            if (error) throw new Error(error);
            try {
                console.log(response.body);
                resolve(response.body);
            } catch (error) {
                reject(error);
            }

        });
>>>>>>> 7179377c18284b5b7735a5680893657c93633221
    });
};