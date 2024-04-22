import express from "express";

const paymentController = require('../controllers/paymentController');
const requireAuthBidder = require('../middlewares/requireAuthBidder');


const router = express.Router();

// for payment

router.get('/payment/:id', paymentController.handleGetPaymentById);
// payment: xem payments của 1 user (chỉ trả về của 1 user)
router.get('/payment', paymentController.handleGetAllPaymentsByBidder);
// admin xem tất cả payment
router.get('/payment-admin', paymentController.handleGetAllPaymentsByAdmin);

// by bidder
router.post('/payment', paymentController.handleAddPayment);
router.post('/deposit', paymentController.handleAddDeposit);

// by admin
router.put('/payment-verify/:payment_id', paymentController.handleVerifyPayment);
router.put('/deposit-refund/:id', paymentController.handleRefundDeposit);


router.delete('/payment/:id', paymentController.handleDeletePayment);

export default router;
