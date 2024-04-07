const {
    addPayment,
    getPaymentById,
    getAllPaymentsByAdmin,
    getAllPaymentsByBidder,
    updatePayment,
    deletePayment,
} = require('../services/paymentService');

const PAYMENT_TYPE_PAYMENT = "Payment for bid winner"
const PAYMENT_TYPE_DEPOSIT = "Deposit"
const PAYMENT_STATUS_PENDING = "Pending" // waiting for admin verification
const PAYMENT_STATUS_VERIFY = "Verify" // waiting for admin verification
const PAYMENT_STATUS_REFUND = "Refund" // waiting for admin verification

const paymentController = {
    // Hàm xử lý thêm thanh toán mới
    handleAddPayment: async (req, res) => {
        try {
            const { bid_id } = req.body;
            if (!bid_id) {
                return res.status(400).json({ error: 'Missing required fields' });
            }


            const payment_type = PAYMENT_TYPE_PAYMENT
            const payment_status = PAYMENT_STATUS_PENDING


            await addPayment({ bid_id, payment_type, payment_status });
            res.status(201).json({ message: 'Payment added successfully' });
        } catch (error) {
            console.error('Error adding payment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    handleAddDeposit: async (req, res) => {
        try {
            const { bid_id } = req.body;
            if (!bid_id ) {
                return res.status(400).json({ error: 'Missing required fields' });
            }


            const payment_type = PAYMENT_TYPE_DEPOSIT
            const payment_status = PAYMENT_STATUS_PENDING


            await addPayment({ bid_id, payment_type, payment_status });
            res.status(201).json({ message: 'Deposit added successfully' });
        } catch (error) {
            console.error('Error adding payment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


    // Hàm xử lý đọc thông tin của một thanh toán dựa trên payment_id
    handleGetPaymentById: async (req, res) => {
        try {
            const { id } = req.params;
            const payment = await getPaymentById(id);
            if (!payment) {
                return res.status(404).json({ error: 'Payment not found' });
            }
            res.status(200).json(payment);
        } catch (error) {
            console.error('Error getting payment by id:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hàm xử lý đọc tất cả các thanh toán (cho admin)
    handleGetAllPaymentsByAdmin: async (req, res) => {
        try {
            const payments = await getAllPaymentsByAdmin();
            res.status(200).json(payments);
        } catch (error) {
            console.error('Error getting all payments (admin):', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hàm xử lý đọc tất cả các thanh toán của một người dùng (cho bidder)
    handleGetAllPaymentsByBidder: async (req, res) => {
        try {
            // cần auth
            // TODO: Implement logic to get all payments of a bidder
            
            const user_phone_number = req.body.phone_number;
            const payments = await getAllPaymentsByBidder(user_phone_number);
            res.status(200).json(payments);
        } catch (error) {
            console.error('Error getting all payments (bidder):', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hàm xử lý cập nhật thông tin của một thanh toán
    handleVerifyPayment: async (req, res) => {
        try {
            const { id } = req.params;
            await updatePayment(id, PAYMENT_STATUS_VERIFY);
            res.status(200).json({ message: 'Payment updated verify successfully' });
        } catch (error) {
            console.error('Error updating payment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    handleRefundDeposit: async (req, res) => {
        try {
            const { id } = req.params;
            await updatePayment(id, PAYMENT_STATUS_REFUND);
            res.status(200).json({ message: 'Payment updated PAYMENT_STATUS_REFUND successfully' });
        } catch (error) {
            console.error('Error updating payment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


    // Hàm xử lý xóa một thanh toán dựa trên payment_id
    handleDeletePayment: async (req, res) => {
        try {
            const { id } = req.params;
            await deletePayment(id);
            res.status(200).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            console.error('Error deleting payment:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = paymentController;
