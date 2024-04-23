import * as httpRequest from '~/utils/httpRequest';

export const getAllPaymentsAdmin = async () => {
    try {
        const res = await httpRequest.get('payment-admin');
        return res;
    } catch (error) {
        console.log('[PAYMENT SERVICE]', error);
    }
};

export const addDeposit = async (auction_id, user_phone_number) => {
    try {
        const res = await httpRequest.post('deposit', {
            auction_id,
            user_phone_number,
        });
        return res;
    } catch (error) {
        console.log('[PAYMENT SERVICE]', error);
    }
};

export const verifyDeposit = async (bid_id) => {
    try {
        const res = await httpRequest.put(`payment-verify/${bid_id}`);
        return res;
    } catch (error) {
        console.log('[PAYMENT SERVICE]', error);
    }
};