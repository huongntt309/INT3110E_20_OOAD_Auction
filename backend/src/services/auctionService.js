// Thêm một phiên đấu giá mới
async function addAuction(auctionData) {
    const { plate_id, start_date, end_date, city, plate_type, vehicle_type } = auctionData;
    const auction_status = 'in progress'
    const bid_winner_id = 'null'


    const query_plate = `INSERT OR IGNORE INTO vehicle_registration_plates (plate_id, city, plate_type, vehicle_type) VALUES (?, ?, ?, ?)`;


    const query_auction = `
      INSERT INTO auctions (plate_id, start_date, end_date, auction_status, bid_winner_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    try {
        await global.db.run(query_plate, [plate_id, city, plate_type, vehicle_type]);
        await global.db.run(query_auction, [plate_id, start_date, end_date, auction_status, bid_winner_id]);
        console.log('Auction added successfully.');
    } catch (error) {
        console.error('Error adding auction:', error);
    }
};

// Đọc thông tin của một phiên đấu giá dựa trên auction_id
async function getAuctionById(auctionId) {
    console.log(typeof auctionId);
    const int_auctionId = parseInt(auctionId, 10);
    const query = `
        SELECT auctions.*, vrp.city, vrp.plate_type, vrp.vehicle_type
        FROM auctions
        INNER JOIN vehicle_registration_plates AS vrp 
        ON auctions.plate_id = vrp.plate_id
        WHERE auctions.auction_id = ?
    `;

    try {
        const auctionWithPlate = await global.db.get(query, [int_auctionId]);
        return auctionWithPlate;
    } catch (error) {
        console.error('Error getting auction:', error);
    }
};

// Đọc tất cả các phiên đấu giá
async function getAllAuctions() {
    const query = `
        SELECT auctions.*, vrp.city, vrp.plate_type, vrp.vehicle_type
        FROM auctions
        INNER JOIN vehicle_registration_plates AS vrp 
        ON auctions.plate_id = vrp.plate_id
    `;
    try {
        const auctions = await global.db.all(query);
        return auctions;
    } catch (error) {
        console.error('Error getting auctions:', error);
    }
};

// Cập nhật thông tin của một phiên đấu giá
async function updateAuction(auctionId, newData) {
    const { plate_id, start_date, end_date, auction_status, bid_winner_id, city, plate_type, vehicle_type } = newData;
    const int_auctionId = parseInt(auctionId);
    // Cập nhật thông tin trong bảng auctions
    const queryAuction = `
        UPDATE auctions
        SET plate_id = ?, start_date = ?, end_date = ?, auction_status = ?, bid_winner_id = ?
        WHERE auction_id = ?
    `;

    // Cập nhật thông tin trong bảng vehicle_registration_plates
    const queryPlate = `
        UPDATE vehicle_registration_plates
        SET city = ?, plate_type = ?, vehicle_type = ?
        WHERE plate_id = ?
    `;
    try {
        await global.db.run(queryAuction, [plate_id, start_date, end_date, auction_status, bid_winner_id, int_auctionId]);
        await global.db.run(queryPlate, [city, plate_type, vehicle_type, plate_id]);
      console.log('Auction updated successfully.');
    } catch (error) {
        console.error('Error updating auction:', error);
    }
};

// Xóa một phiên đấu giá dựa trên auction_id
async function deleteAuction(auctionId) {
    const query = 'DELETE FROM auctions WHERE auction_id = ?';
    try {
        await global.db.run(query, [auctionId]);
        console.log('Auction deleted successfully.');
    } catch (error) {
        console.error('Error deleting auction:', error);
    }
}


export {
    addAuction,
    getAuctionById,
    getAllAuctions,
    updateAuction,
    deleteAuction,
};