import express from "express";

const auctionController = require('../controllers/auctionController').default;
const bidderController = require('../controllers/bidderController').default;

const requireAuthAdmin = require("../middlewares/requireAuthAdmin");
const requireAuthBidder = require("../middlewares/requireAuthBidder");

const router = express.Router();


router.get('/auction', auctionController.handleGetAllAuctions);
router.get('/auction/:auctionId', auctionController.handleGetAuctionById);
router.get('/auction/user/:userId', auctionController.handleGetAuctionsByUser);
// bid: xem bid của 1 auction
router.get('/auction/bid/:auctionId', auctionController.handleGetAllBidsByAuctionId);
router.get('/auction/bidder/:auctionId', auctionController.handleGetAllBiddersAndBidPriceByAuctionId);

router.post('/auction', auctionController.handleCreateNewAuction);
router.put('/auction/:auctionId', auctionController.handleUpdateAuction);
router.delete('/auction/:auctionId', auctionController.handleDeleteAuction);

export default router;
