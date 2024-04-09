import * as httpRequest from '~/utils/httpRequest';

export const getAllItems = async () => {
    try {
        const res = httpRequest.get('auction');
        return res;
    } catch (error) {
        console.log('[PRODUCTS SERVICE]', error);
    }
}