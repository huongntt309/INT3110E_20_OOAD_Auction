const AUCTION_STATUS_OPEN = 'Đang diễn ra'
const AUCTION_STATUS_CLOSED = 'Đã kết thúc'
const AUCTION_STATUS_WAIT_TO_OPEN = 'Chưa diễn ra'

// Thêm một phiên đấu giá mới
async function addAuction(auctionData) {
    const { plate_id, start_date, end_date, city, plate_type, vehicle_type } = auctionData;
    const auction_status = AUCTION_STATUS_WAIT_TO_OPEN;
    const bid_winner_id = 'null'

    const query_plate = `INSERT OR IGNORE INTO vehicle_registration_plates (plate_id, city, plate_type, vehicle_type) VALUES (?, ?, ?, ?)`;

    const query_auction = `
      INSERT INTO auctions (plate_id, start_date, end_date, auction_status, bid_winner_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    try {
        await global.db.run(query_plate, [plate_id, city, plate_type, vehicle_type]);
        const result = await global.db.run(query_auction, [plate_id, start_date, end_date, auction_status, bid_winner_id]);
        const auction_id = result.lastID; // Lấy auction_id từ kết quả trả về
        console.log('Auction added successfully.');
        return auction_id; // Trả lại auction_id
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


async function getAuctionsByUser(user_phone_number) {
    try {
        // Select bids with bid_status = "Verify" or "PENDING" and user_phone_number = user_phone_number
        const query = `
            SELECT auction_id, bid_status
            FROM bids
            WHERE user_phone_number = ? AND bid_status IN ('Verify', 'PENDING')
        `;
        // Execute the query to get both "Verify" and "PENDING" bids
        const rows = await global.db.all(query, [user_phone_number]);

        const auctions = {
            'Verify': [],
            'PENDING': []
        };

        // Retrieve auction information for each auction_id
        for (const row of rows) {
            const auction = await getAuctionById(row.auction_id);
            auctions[row.bid_status].push(auction);
        }

        return auctions;
    } catch (error) {
        console.error('Error getting auctions:', error);
    }
}

async function getAllBiddersAndBidPriceByAuctionId(auction_id) {
    // Select user_phone_number, bidPrice, bid_status with WHERE auction_id = ?, classify 2 types of users by bid_status 
    const query = 'SELECT user_phone_number, bid_price, bid_status FROM bids WHERE auction_id = ?';
    try {
        const rows = await global.db.all(query, [auction_id]);
        const bidders = {
            'Verify': [],
            'PENDING': []
        };

        rows.forEach(row => {
            if (row.bid_status === 'Verify') {
                bidders['Verify'].push({ user_phone_number: row.user_phone_number, bid_price: row.bid_price });
            } else if (row.bid_status === 'PENDING') {
                bidders['PENDING'].push({ user_phone_number: row.user_phone_number, bid_price: row.bid_price });
            }
        });

        return bidders;
    } catch (error) {
        console.error('Error getting bids:', error);
        return null;
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

async function getAllBidsByAuctionId(auction_id) {
    const query = 'SELECT * FROM bids WHERE auction_id = ?';
    try {
        const bids = await global.db.get(query, [auction_id]);
        return bids;
    } catch (error) {
        console.error('Error getting bids:', error);
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

// cập nhật trạng thái cho auction status
async function updateAuctionStatus(auctionId, newStatus) {
    const queryAuction = `
        UPDATE auctions
        SET auction_status = ?
        WHERE auction_id = ?
    `;

    try {
        await global.db.run(queryAuction, [newStatus, auctionId]);
    } catch (error) {
        console.error('Error updating auction status:', error);
    }
};

// Đóng mở một phiên đấu giá
async function closeAuction(auctionId) {
    try {
        await updateAuctionStatus(auctionId, AUCTION_STATUS_CLOSED);
        console.log('Auction status closeAuction successfully.');
    } catch (error) {
        console.error('Error updating auction status:', error);
    }
}

// Đóng mở một phiên đấu giá
async function openAuction(auctionId) {
    try {
        await updateAuctionStatus(auctionId, AUCTION_STATUS_OPEN);
        console.log('Auction status openAuction successfully.');
    } catch (error) {
        console.error('Error updating auction status:', error);
    }
}

// Đóng mở một phiên đấu giá
async function pendingAuction(auctionId) {
    try {
        await updateAuctionStatus(auctionId, AUCTION_STATUS_WAIT_TO_OPEN);
        console.log('Auction status updated successfully.');
    } catch (error) {
        console.error('Error updating auction status:', error);
    }
}

async function updateAllAuctionStatusByTime() {
    const currentDate = new Date();

    try {
        // Lấy danh sách tất cả phiên đấu giá từ cơ sở dữ liệu
        const auctions = await getAllAuctions();

        // Duyệt qua từng phiên đấu giá và cập nhật trạng thái
        for (const auction of auctions) {
            console.log(auction.auction_id);

            const startDate = new Date(auction.start_date);
            const endDate = new Date(auction.end_date);

            // if thời gian hiện tại < start_date
            if (currentDate < startDate) {
                // thực ra là phải pendingAuctions nhưng ngay từ đầu đã pending r nên k cần
                console.log(`${auction.auction_id} pending`);
            }
            // if thời gian hiện tại >= start_date
            else if (currentDate >= startDate && currentDate <= endDate) {
                // if thời gian hiện tại =< end_date
                await openAuction(auction.auction_id);
            }
            // if thời gian hiện tại > end_date
            else if (currentDate > endDate) {
                await closeAuction(auction.auction_id);
            }
        }
        console.log('Auction status update scheduled successfully.');
    }

    catch (error) {
        console.error('Error updating auction status:', error);
    }
};

export {
    addAuction,
    getAuctionById,
    getAllAuctions,
    updateAuction,
    deleteAuction,
    updateAuctionStatus,
    closeAuction,
    openAuction,
    pendingAuction,
    getAuctionsByUser,
    updateAllAuctionStatusByTime,
    getAllBidsByAuctionId,
    getAllBiddersAndBidPriceByAuctionId,
};