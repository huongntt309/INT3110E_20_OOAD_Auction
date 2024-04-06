const paymentService = {
    // Thêm một thanh toán mới
    addPayment: async (paymentData) => {
        const { bid_id, payment_type, payment_status } = paymentData;
        const query = `
      INSERT INTO payments (bid_id, payment_type, payment_status)
      VALUES (?, ?, ?)
    `;
        try {
            await db.run(query, [bid_id, payment_type, payment_status]);
            console.log('Payment added successfully.');
        } catch (error) {
            console.error('Error adding payment:', error);
        }
    },

    // Đọc thông tin của một thanh toán dựa trên payment_id
    getPaymentById: async (paymentId) => {
        const query = 'SELECT * FROM payments WHERE payment_id = ?';
        try {
            const payment = await db.get(query, [paymentId]);
            return payment;
        } catch (error) {
            console.error('Error getting payment:', error);
        }
    },

    // Đọc tất cả các thanh toán
    getAllPayments: async () => {
        const query = 'SELECT * FROM payments';
        try {
            const payments = await db.all(query);
            return payments;
        } catch (error) {
            console.error('Error getting payments:', error);
        }
    },

    // Cập nhật thông tin của một thanh toán
    updatePayment: async (paymentId, newData) => {
        const { bid_id, payment_type, payment_status } = newData;
        const query = `
      UPDATE payments
      SET bid_id = ?, payment_type = ?, payment_status = ?
      WHERE payment_id = ?
    `;
        try {
            await db.run(query, [bid_id, payment_type, payment_status, paymentId]);
            console.log('Payment updated successfully.');
        } catch (error) {
            console.error('Error updating payment:', error);
        }
    },

    // Xóa một thanh toán dựa trên payment_id
    deletePayment: async (paymentId) => {
        const query = 'DELETE FROM payments WHERE payment_id = ?';
        try {
            await db.run(query, [paymentId]);
            console.log('Payment deleted successfully.');
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    }
};

module.exports = paymentService;