const auctionService = {
    // Thêm một phiên đấu giá mới
    addAuction: async (auctionData) => {
        const { plate_id, start_date, end_date, auction_status, bid_winner_id } = auctionData;
        const query = `
      INSERT INTO auctions (plate_id, start_date, end_date, auction_status, bid_winner_id)
      VALUES (?, ?, ?, ?, ?)
    `;
        try {
            await global.db.run(query, [plate_id, start_date, end_date, auction_status, bid_winner_id]);
            console.log('Auction added successfully.');
        } catch (error) {
            console.error('Error adding auction:', error);
        }
    },

    // Đọc thông tin của một phiên đấu giá dựa trên auction_id
    getAuctionById: async (auctionId) => {
        const query = 'SELECT * FROM auctions WHERE auction_id = ?';
        try {
            const auction = await global.db.get(query, [auctionId]);
            return auction;
        } catch (error) {
            console.error('Error getting auction:', error);
        }
    },

    // Đọc tất cả các phiên đấu giá
    getAllAuctions: async () => {
        const query = 'SELECT * FROM auctions';
        try {
            const auctions = await global.db.all(query);
            return auctions;
        } catch (error) {
            console.error('Error getting auctions:', error);
        }
    },

    // Cập nhật thông tin của một phiên đấu giá
    updateAuction: async (auctionId, newData) => {
        const { plate_id, start_date, end_date, auction_status, bid_winner_id } = newData;
        const query = `
      UPDATE auctions
      SET plate_id = ?, start_date = ?, end_date = ?, auction_status = ?, bid_winner_id = ?
      WHERE auction_id = ?
    `;
        try {
            await global.db.run(query, [plate_id, start_date, end_date, auction_status, bid_winner_id, auctionId]);
            console.log('Auction updated successfully.');
        } catch (error) {
            console.error('Error updating auction:', error);
        }
    },

    // Xóa một phiên đấu giá dựa trên auction_id
    deleteAuction: async (auctionId) => {
        const query = 'DELETE FROM auctions WHERE auction_id = ?';
        try {
            await global.db.run(query, [auctionId]);
            console.log('Auction deleted successfully.');
        } catch (error) {
            console.error('Error deleting auction:', error);
        }
    }
};

module.exports = auctionService;