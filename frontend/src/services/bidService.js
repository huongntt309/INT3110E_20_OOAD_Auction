import * as httpRequest from '~/utils/httpRequest';

export const getAllBids = async (token) => {
    try {
        const res = await httpRequest.get('bid-admin', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        console.log('[BID SERVICE]', error);
    }
};

export const createBid = async (auction_id, user_phone_number, bid_price) => {
    try {
        const res = await httpRequest.post('bid', {
            auction_id,
            user_phone_number,
            bid_price,
        });
        return res;
    } catch (error) {
        console.log('[BID SERVICE]', error);
    }
};

export const updateBid = async (bid_id, bid_price, bid_status) => {
    try {
        const res = await httpRequest.put(`bid/${bid_id}`, {
            bid_price,
            bid_status,
        });
        return res;
    } catch (error) {
        console.log('[BID SERVICE]', error);
    }
};