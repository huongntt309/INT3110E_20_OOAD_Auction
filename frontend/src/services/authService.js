import * as httpRequest from '~/utils/httpRequest';

export const login = async (mobile, password) => {
    try {
        const res = await httpRequest.post('login', {
            mobile,
            password
        });
        return res;
    } catch (error) {
        console.log(error)
    }
};