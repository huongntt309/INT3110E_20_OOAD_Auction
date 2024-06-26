import * as httpRequest from '~/utils/httpRequest';

export const getAllItems = async () => {
    try {
        const res = await httpRequest.get('auction');
        return res;
    } catch (error) {
        console.log('[PRODUCTS SERVICE]', error);
    }
}

export const getItemById = async (auction_id) => {
    try {
        const res = await httpRequest.get(`auction/${auction_id}`);
        return res;
    } catch (error) {
        console.log('[PRODUCTS SERVICE]', error);
    }
}

export const createItem = async (
    plate_id,
    start_date,
    end_date,
    city,
    plate_type,
    vehicle_type,
) => {
    try {
        const res = await httpRequest.post('auction', {
            plate_id,
            start_date,
            end_date,
            city,
            plate_type,
            vehicle_type,
        });
        return res;
    } catch (error) {
        console.log('[PRODUCTS SERVICE]', error);
    }
}

export const updateItem = async (
    id,
    plate_id,
    start_date,
    end_date,
    auction_status,
    bid_winner_id,
    city,
    plate_type,
    vehicle_type,
) => {
    try {
        const res = await httpRequest.put(`auction/${id}`, {
            plate_id,
            start_date,
            end_date,
            auction_status,
            bid_winner_id,
            city,
            plate_type,
            vehicle_type,
        });
        return res;
    } catch (error) {
        console.log('[PRODUCTS SERVICE]', error);
    }
}

export const deleteItem = async (id) => {
    try {
        const res = await httpRequest.del(`auction/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const getRegisterItems = async (phone_number) => {
    try {
        const res = await httpRequest.get(`auction/user/${phone_number}`);
        return res;
    } catch (error) {
        console.log('[PRODUCTS SERVICE]', error);
    }
}

export const getAllUsers = async (id) => {
    try {
        const res = await httpRequest.get(`auction/bidder/${id}`);
        return res;
    } catch (error) {
        console.log('[PRODUCTS SERVICE]', error);
    }
}

export const getAllDeposits = async (id) => {
    try {
        const res = await httpRequest.get(`auction/bid/${id}`);
        return res;
    } catch (error) {
        console.log('[PRODUCTS SERVICE]', error);
    }
}
