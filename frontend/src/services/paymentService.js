import * as httpRequest from '~/utils/httpRequest';

export const getAllPaymentsAdmin = async () => {
    try {
        const res = await httpRequest.get('payment-admin');
        return res;
    } catch (error) {
        console.log('[PAYMENT SERVICE]', error);
    }
};