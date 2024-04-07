// Thêm một bid mới
async function addBid(bidData) {
    const { auction_id, user_phone_number, bid_price, bid_status } = bidData;
    const query = `
      INSERT INTO bids (auction_id, user_phone_number, bid_price, bid_status)
      VALUES (?, ?, ?, ?)
    `;
    try {
        await global.db.run(query, [auction_id, user_phone_number, bid_price, bid_status]);
        console.log('Bid added successfully.');
    } catch (error) {
        console.error('Error adding bid:', error);
    }
};

// Đọc thông tin của một bid dựa trên bid_id
async function getBidById(bidId) {
    const query = 'SELECT * FROM bids WHERE bid_id = ?';
    try {
        const bid = await global.db.get(query, [bidId]);
        return bid;
    } catch (error) {
        console.error('Error getting bid:', error);
    }
};

// Đọc tất cả các bids
async function getAllBids() {
    const query = 'SELECT * FROM bids';
    try {
        const bids = await global.db.all(query);
        return bids;
    } catch (error) {
        console.error('Error getting bids:', error);
    }
};

async function getAllBidsByBidder(user_phone_number) {
    const query = 'SELECT * FROM bids WHERE user_phone_number = ?';
    try {
        const bids = await global.db.get(query, [user_phone_number]);
        return bids;
    } catch (error) {
        console.error('Error getting bids:', error);
    }
};

// Cập nhật thông tin của một bid
async function updateBid(bidId, newData) {
    const {bid_price, bid_status} = newData;
    const query = `
      UPDATE bids
      SET bid_price = ?, bid_status = ?
      WHERE bid_id = ?
    `;
    try {
        await global.db.run(query, [bid_price, bid_status, bidId]);
        console.log('Bid updated successfully.');
    } catch (error) {
        console.error('Error updating bid:', error);
    }
};

// Xóa một bid dựa trên bid_id
async function deleteBid(bidId) {
    const query = 'DELETE FROM bids WHERE bid_id = ?';
    try {
        await global.db.run(query, [bidId]);
        console.log('Bid deleted successfully.');
    } catch (error) {
        console.error('Error deleting bid:', error);
    }
}

export {
    addBid,
    getBidById,
    getAllBids,
    deleteBid,
    updateBid,
    getAllBidsByBidder,
};