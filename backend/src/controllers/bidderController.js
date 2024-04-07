const {
    addBid,
    getBidById,
    // getAllBids,
    getAllBidsByBidder,
    updateBid,
    deleteBid,
    getAllBids,
} = require('../services/bidService');


const handleCreateNewBid = async (req, res) => {
    try {
        const { auction_id, user_phone_number, bid_price } = req.body;
        const bid_status = 'PENDING';
        if (!auction_id || !user_phone_number || !bid_price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        await addBid({ auction_id, user_phone_number, bid_price, bid_status });
        res.status(201).json({ message: 'Bid added successfully' });
    } catch (error) {
        console.error('Error creating bid:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Hàm xử lý lấy thông tin của một bid dựa trên bid_id
const handleGetBidById = async (req, res) => {
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
};

// Hàm xử lý lấy tất cả các bids
const handleGetAllBidsByBidder = async (req, res) => {
    try {
        const user_phone_number = req.user.phone_number;
        console.log(user_phone_number);
        const bids = await getAllBidsByBidder(user_phone_number);
        res.status(200).json(bids);
    } catch (error) {
        console.error('Error getting all bids:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const handleGetAllBidsByAdmin = async (req, res) => {
    try {
        const bids = await getAllBids();
        res.status(200).json(bids);
    } catch (error) {
        console.error('Error getting all bids:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Hàm xử lý cập nhật thông tin của một bid
const handleUpdateBid = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        await updateBid(id, newData);
        res.status(200).json({ message: 'Bid updated successfully' });
    } catch (error) {
        console.error('Error updating bid:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Hàm xử lý xóa một bid dựa trên bid_id
const handleDeleteABid = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteBid(id);
        res.status(200).json({ message: 'Bid deleted successfully' });
    } catch (error) {
        console.error('Error deleting bid:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    handleGetAllBidsByAdmin,
    handleCreateNewBid,
    handleGetBidById,
    handleGetAllBidsByBidder,
    handleUpdateBid,
    handleDeleteABid,
}