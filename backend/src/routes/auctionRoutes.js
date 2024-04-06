import express from "express";

const auctionController = require('../controllers/auctionController').default;

const router = express.Router();


router.get('/auction', auctionController.handleGetAllAuctions);
router.get('/auction/:auctionId', auctionController.handleGetAuctionById);
router.post('/auction', auctionController.handleCreateNewAuction);
router.put('/auction/:auctionId', auctionController.handleUpdateAuction);
router.delete('/auction/:auctionId', auctionController.handleDeleteAuction);

export default router;
