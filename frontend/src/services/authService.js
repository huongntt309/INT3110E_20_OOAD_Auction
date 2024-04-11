import * as httpRequest from '~/utils/httpRequest';

export const login = async (phone_number, password) => {
    try {
        const res = await httpRequest.post('login', {
            phone_number,
            password
        });
        return res;
    } catch (error) {
        console.log('[AUTH SERVICE]', error)
    }
};