const accountService = {
    // Thêm một tài khoản mới
    createAccount: async (accountData) => {
        const { phone_number, password, role, first_name, last_name, dob, address } = accountData;
        const query = `
      INSERT INTO accounts (phone_number, password, created_at, role, first_name, last_name, dob, address)
      VALUES (?, ?, datetime('now'), ?, ?, ?, ?, ?)
    `;
        try {
            await global.db.run(query, [phone_number, password, role, first_name, last_name, dob, address]);
            console.log('Account created successfully.');
        } catch (error) {
            console.error('Error creating account:', error);
        }
    },

    // Đọc thông tin của một tài khoản dựa trên số điện thoại
    getAccountByPhoneNumber: async (phoneNumber) => {
        const query = 'SELECT * FROM accounts WHERE phone_number = ?';
        try {
            const account = await global.db.get(query, [phoneNumber]);
            return account;
        } catch (error) {
            console.error('Error getting account:', error);
        }
    },

    // Đọc tất cả các tài khoản
    getAllAccounts: async () => {
        const query = 'SELECT * FROM accounts';
        try {
            const accounts = await global.db.all(query);
            return accounts;
        } catch (error) {
            console.error('Error getting accounts:', error);
        }
    },

    // Cập nhật thông tin của một tài khoản
    updateAccount: async (phoneNumber, newData) => {
        const { password, role, first_name, last_name, dob, address } = newData;
        const query = `
      UPDATE accounts
      SET password = ?, role = ?, first_name = ?, last_name = ?, dob = ?, address = ?
      WHERE phone_number = ?
    `;
        try {
            await global.db.run(query, [password, role, first_name, last_name, dob, address, phoneNumber]);
            console.log('Account updated successfully.');
        } catch (error) {
            console.error('Error updating account:', error);
        }
    },

    // Xóa một tài khoản dựa trên số điện thoại
    deleteAccount: async (phoneNumber) => {
        const query = 'DELETE FROM accounts WHERE phone_number = ?';
        try {
            await global.db.run(query, [phoneNumber]);
            console.log('Account deleted successfully.');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    },

    // Đăng nhập
    login: async (phone_number, password) => {
        try {
            const account = await accountService.getAccountByPhoneNumber(phone_number);
            if (!account) {
                return false; // Tài khoản không tồn tại
            }
            // Kiểm tra mật khẩu
            if (account.password === password) {
                return true; // Đăng nhập thành công
            } else {
                return false; // Sai mật khẩu
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw new Error('Error logging in');
        }
    }
};

module.exports = accountService;