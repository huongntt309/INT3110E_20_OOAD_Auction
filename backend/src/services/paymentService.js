
// Thêm một thanh toán mới
async function addPayment(paymentData) {
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
}

// Đọc thông tin của một thanh toán dựa trên payment_id
async function getPaymentById(paymentId) {
    const query = 'SELECT * FROM payments WHERE payment_id = ?';
    try {
        const payment = await db.get(query, [paymentId]);
        return payment;
    } catch (error) {
        console.error('Error getting payment:', error);
    }
}

// Đọc tất cả các thanh toán
async function getAllPaymentsByAdmin() {
    const query = 'SELECT * FROM payments';
    try {
        const payments = await db.all(query);
        return payments;
    } catch (error) {
        console.error('Error getting payments:', error);
    }
}

// Đọc tất cả các thanh toán của 1 người user
// TODO: cần xử lý logic chéo 2 bảng, để sau, tích hợp đã 
async function getAllPaymentsByBidder(user_phone_number) {
    // 
    const query = `SELECT payments.*
                    FROM payments
                    INNER JOIN bids ON payments.bid_id = bids.bid_id
                    WHERE bids.user_phone_number = ?;`;
    try {
        const payments = await db.get(query, [user_phone_number]);
        return payments;
    } catch (error) {
        console.error('Error getting payments:', error);
    }
}

// Cập nhật thông tin của một thanh toán
async function updatePayment(paymentId, payment_status) {
    const query = `
      UPDATE payments
      SET payment_status = ?
      WHERE payment_id = ?
    `;
    try {
        await db.run(query, [payment_status, paymentId]);
        console.log('Payment updated successfully.');
    } catch (error) {
        console.error('Error updating payment:', error);
    }
}

// Xóa một thanh toán dựa trên payment_id
async function deletePayment(paymentId) {
    const query = 'DELETE FROM payments WHERE payment_id = ?';
    try {
        await db.run(query, [paymentId]);
        console.log('Payment deleted successfully.');
    } catch (error) {
        console.error('Error deleting payment:', error);
    }
}

export {
    addPayment,
    getPaymentById,
    getAllPaymentsByAdmin,
    getAllPaymentsByBidder,
    updatePayment,
    deletePayment,
};