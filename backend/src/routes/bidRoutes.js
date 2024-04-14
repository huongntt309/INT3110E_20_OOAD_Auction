import express from "express";

const bidderController = require('../controllers/bidderController');

const requireAuthAdmin = require("../middlewares/requireAuthAdmin");
const requireAuthBidder = require("../middlewares/requireAuthBidder");

const router = express.Router();

// for bidder

// xem 1 bid nào đó
router.get('/bid/:id', requireAuthBidder, bidderController.handleGetBidById);
// bid: xem bids của 1 user (chỉ trả về của 1 user)
router.get('/bid', requireAuthBidder, bidderController.handleGetAllBidsByBidder);
// admin xem tất cả bid
router.get('/bid-admin', bidderController.handleGetAllBidsByAdmin);


router.get('/bit-deposit-check/:bid_id', bidderController.handleCheckDeposit);

router.post('/bid', bidderController.handleCreateNewBid);
router.put('/bid/:id', bidderController.handleUpdateBid);
router.delete('/bid/:id', bidderController.handleDeleteABid);

export default router;
