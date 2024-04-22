const PAYMENT_TYPE_PAYMENT = "Payment for bid winner"
const PAYMENT_TYPE_DEPOSIT = "Deposit"
const PAYMENT_STATUS_PENDING = "Pending" // waiting for admin verification
const PAYMENT_STATUS_VERIFY = "Verify" // waiting for admin verification
const PAYMENT_STATUS_REFUND = "Refund" // waiting for admin verification
const BID_STATUS_VERIFY = "Verify" 

// Thêm một bid mới
async function addBid(bidData) {
    const { auction_id, user_phone_number, bid_price, bid_status } = bidData;
    const query = `
      INSERT INTO bids (auction_id, user_phone_number, bid_price, bid_status)
      VALUES (?, ?, ?, ?)
    `;
    try {
        const result = await global.db.run(query, [auction_id, user_phone_number, bid_price, bid_status]);
        const insertedId = result.lastID;
        console.log('Bid added successfully. ID:', insertedId);
        return insertedId;
    } catch (error) {
        console.error('Error adding bid:', error);
        return null;
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


async function getAuctionIdByBidId(bidId) {
    const query = 'SELECT auction_id FROM bids WHERE bid_id = ?';
    try {
        const result = await global.db.get(query, [bidId]);
        return result.auction_id;
    } catch (error) {
        console.error('Error getting auction id by bid id:', error);
    }
}

async function getBidByAuctionIdAndUserPhoneNumber(auctionId, phoneNumber) {
    const query = 'SELECT * FROM bids WHERE auction_id = ? AND user_phone_number = ?';
    try {
        const bid = await global.db.get(query, [auctionId, phoneNumber]);
        return bid;
    } catch (error) {
        console.error('Error getting bid:', error);
    }
}

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
    const { bid_price, bid_status } = newData;
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

// Cập nhật thông tin của một bid
async function updateBidStatus(bidId, bid_status) {

    const query = `
      UPDATE bids
      SET bid_status = ?
      WHERE bid_id = ?
    `;
    try {
        await global.db.run(query, [bid_status, bidId]);
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

async function refreshBidWinner(auction_id) {
    const query = `
        UPDATE auctions
        SET bid_winner_id = (
            SELECT user_phone_number
            FROM bids
            WHERE auction_id = ?
            ORDER BY bid_price DESC
            LIMIT 1
        )
        WHERE auction_id = ?
    `;
    try {
        await global.db.run(query, [auction_id, auction_id]);
        console.log('Bid winner refreshed successfully.');
    } catch (error) {
        console.error('Error refreshing bid winner:', error);
    }
}

async function validateDeposit(bid_id) {
    const query = `
        SELECT COUNT(*) AS count
        FROM payments
        WHERE bid_id = ? 
        AND payment_type = ${PAYMENT_TYPE_DEPOSIT} 
        AND payment_status = ${PAYMENT_STATUS_VERIFY}
    `;
    try {
        const result = await global.db.get(query, [bid_id]);
        // If count is greater than 0, it means there's already a deposit for the bid
        return result.count > 0;
    } catch (error) {
        console.error('Error validating deposit:', error);
        return false;
    }
}

async function updateAllBidStatusByTime() {
    try {
        // Retrieve bids that meet the conditions from the payments table
        const query = `
            SELECT b.bid_id, b.bid_status
            FROM bids b
            JOIN payments p ON b.bid_id = p.bid_id
            WHERE p.payment_type = 'Deposit' AND p.payment_status = 'Verify'
        `;
        const rows = await global.db.all(query);

        // Iterate through the retrieved bids and update their status
        for (const row of rows) {
            await updateBidStatus(row.bid_id, BID_STATUS_VERIFY); // You need to define the new status here
        }

        console.log('All bids updated successfully.');
    } catch (error) {
        console.error('Error updating bids:', error);
    }
}



export {
    addBid,
    getBidById,
    getAllBids,
    deleteBid,
    updateBid,
    updateBidStatus,
    refreshBidWinner,
    getAuctionIdByBidId,
    getBidByAuctionIdAndUserPhoneNumber,
    getAllBidsByBidder,
    updateAllBidStatusByTime,
    getBidByAuctionIdAndUserPhoneNumber,
    validateDeposit
};