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

export const signUp = async (
    phone_number,
    password,
    first_name,
    last_name,
    role,
    dob,
    address,
) => {
    try {
        const res = await httpRequest.post('sign-up', {
            phone_number,
            password,
            role,
            first_name,
            last_name,
            dob,
            address,
        });
        return res;
    } catch (error) {
        console.log('[AUTH SERVICE]', error)
    }
};