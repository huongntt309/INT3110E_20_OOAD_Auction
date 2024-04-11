import {
    addAuction,
    getAuctionById,
    getAllAuctions,
    updateAuction,
    deleteAuction,
    closeAuction,
    openAuction,
}
    from '../services/auctionService';

const updateAuctionStatusByTime = async (auction_id, start_date, end_date) => {
    const cron = require('node-cron');
    const currentDate = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    // Chuyển đổi startDate và endDate thành chuỗi thời gian dạng chuẩn
    const startDateString = `${startDate.getMinutes()} ${startDate.getHours()} ${startDate.getDate()} ${startDate.getMonth() + 1} *`;
    const endDateString = `${endDate.getMinutes()} ${endDate.getHours()} ${endDate.getDate()} ${endDate.getMonth() + 1} *`;

    // if thời gian hiện tại < start_date
    if (currentDate < startDate) {
        cron.schedule(startDateString, async () => {
            await openAuction(auction_id);
            console.log('Auction opened at:', new Date());
        });
    }

    // if thời gian hiện tại >= start_date
    if (currentDate >= startDate) {
        // if thời gian hiện tại =< end_date
        if (currentDate <= endDate) {
            // console.log(currentDate);
            cron.schedule(endDateString, async () => {
                await closeAuction(auction_id);
                console.log('Auction closed at:', new Date());
            });
        }
        // if thời gian hiện tại > end_date
        else {
            await closeAuction(auction_id);
        }
    }
    console.log('Auction status update scheduled successfully.');
}

const auctionController = {
    // Xử lý yêu cầu lấy tất cả các phiên đấu giá
    handleGetAllAuctions: async (req, res) => {
        try {
            const currentTime = new Date();
            console.log(currentTime);
            const auctions = await getAllAuctions();
            res.status(200).json(auctions);
        } catch (error) {
            console.error('Error getting all auctions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Xử lý yêu cầu lấy thông tin một phiên đấu giá dựa trên auction_id
    handleGetAuctionById: async (req, res) => {
        const auctionId = req.params.auctionId;
        try {
            const auction = await getAuctionById(auctionId);
            if (auction) {
                res.status(200).json(auction);
            } else {
                res.status(404).json({ error: 'Auction not found' });
            }
        } catch (error) {
            console.error('Error getting auction by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Xử lý yêu cầu tạo một phiên đấu giá mới
    handleCreateNewAuction: async (req, res) => {
        const auctionData = req.body;
        try {
            const { plate_id, start_date, end_date, city, plate_type, vehicle_type } = auctionData;
            const newAuctionId = await addAuction(auctionData);

            await updateAuctionStatusByTime(newAuctionId, start_date, end_date);
            
            res.status(201).json({ message: 'Auction created successfully' });
        } catch (error) {
            console.error('Error creating auction:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Xử lý yêu cầu cập nhật thông tin của một phiên đấu giá dựa trên auction_id
    handleUpdateAuction: async (req, res) => {
        const auctionId = req.params.auctionId;
        const newData = req.body;
        try {
            await updateAuction(auctionId, newData);
            res.status(200).json({ message: 'Auction updated successfully' });
        } catch (error) {
            console.error('Error updating auction:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Xử lý yêu cầu xóa một phiên đấu giá dựa trên auction_id
    handleDeleteAuction: async (req, res) => {
        const auctionId = req.params.auctionId;
        try {
            await deleteAuction(auctionId);
            res.status(200).json({ message: 'Auction deleted successfully' });
        } catch (error) {
            console.error('Error deleting auction:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default auctionController;
