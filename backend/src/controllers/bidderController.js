const {
    addBid,
    getBidById,
    // getAllBids,
    getAllBidsByBidder,
    updateBid,
    deleteBid,
    getAllBids,
    refreshBidWinner,
    getAuctionIdByBidId,
    getBidByAuctionIdAndUserPhoneNumber,
    validateDeposit,
} = require('../services/bidService');

const BID_STATUS_PENDING = 'Pending';
const BID_STATUS_VERIFY = 'Verified';

const bidderController = {
    handleCreateNewBid: async (req, res) => {
        const { auction_id, user_phone_number, bid_price } = req.body;
        const bid_status = BID_STATUS_PENDING;

        try {
            // Kiểm tra xem (auction_id, user_phone_number) đã tồn tại chưa
            const existingBid = await getBidByAuctionIdAndUserPhoneNumber(auction_id, user_phone_number);

            if (existingBid) {
                // Nếu đã tồn tại, thực hiện cập nhật bid
                await updateBid(existingBid.bid_id, { bid_price, bid_status });
                res.status(200).json({ message: 'Bid updated successfully' });
            } else {
                // Nếu chưa tồn tại, thực hiện thêm mới bid
                await addBid({ auction_id, user_phone_number, bid_price, bid_status });
                res.status(201).json({ message: 'Bid added successfully' });
            }
        } catch (error) {
            console.error('Error adding or updating bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    handleGetBidById: async (req, res) => {
        try {
            const { id } = req.params;
            const bid = await getBidById(id);
            if (!bid) {
                return res.status(404).json({ error: 'Bid not found' });
            }
            res.status(200).json(bid);
        } catch (error) {
            console.error('Error getting bid by id:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    handleGetAllBidsByBidder: async (req, res) => {
        try {
            const user_phone_number = req.user.phone_number;
            const bids = await getAllBidsByBidder(user_phone_number);
            res.status(200).json(bids);
        } catch (error) {
            console.error('Error getting all bids:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    handleGetAllBidsByAdmin: async (req, res) => {
        try {
            const bids = await getAllBids();
            res.status(200).json(bids);
        } catch (error) {
            console.error('Error getting all bids:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    handleUpdateBid: async (req, res) => {
        try {
            const { id } = req.params;
            const newData = req.body;
            await updateBid(id, newData);
            const auction_id = await getAuctionIdByBidId(id);
            await refreshBidWinner(auction_id);
            res.status(200).json({ message: 'Bid updated successfully' });
        } catch (error) {
            console.error('Error updating bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    handleDeleteABid: async (req, res) => {
        try {
            const { id } = req.params;
            await deleteBid(id);
            const auction_id = await getAuctionIdByBidId(id);
            await refreshBidWinner(auction_id);
            res.status(200).json({ message: 'Bid deleted successfully' });
        } catch (error) {
            console.error('Error deleting bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    handleCheckDeposit: async (req, res) => {
        try {
            const { bid_id } = req.params;
            const hasDeposit = await validateDeposit(bid_id);

            // Send response based on whether the deposit exists or not
            res.status(200).json({ hasDeposit });
        } catch (error) {
            console.error('Error checking deposit:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = bidderController;
