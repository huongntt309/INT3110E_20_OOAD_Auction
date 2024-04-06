
async function createAccount(accountData) {
    const { phone_number, password, role, first_name, last_name, dob, address } = accountData;
    const query = `
        INSERT INTO accounts (phone_number, password, created_at, role, first_name, last_name, dob, address)
        VALUES (?, ?, datetime('now'), ?, ?, ?, ?, ?)
    `;
    try {
        await db.run(query, [phone_number, password, role, first_name, last_name, dob, address]);
        console.log('Account created successfully.');
    } catch (error) {
        console.error('Error creating account:', error);
    }
}

// Read
async function getAccountByPhoneNumber(phoneNumber) {
    const query = 'SELECT * FROM accounts WHERE phone_number = ?';
    try {
        const account = await db.get(query, [phoneNumber]);
        return account;
    } catch (error) {
        console.error('Error getting account:', error);
    }
}

// Read all accounts
async function getAllAccounts() {
    const query = 'SELECT * FROM accounts';
    try {
        const accounts = await db.all(query);
        return accounts;
    } catch (error) {
        console.error('Error getting accounts:', error);
    }
}


// Update
async function updateAccount(phoneNumber, newData) {
    const { password, role, first_name, last_name, dob, address } = newData;
    const query = `
        UPDATE accounts
        SET password = ?, role = ?, first_name = ?, last_name = ?, dob = ?, address = ?
        WHERE phone_number = ?
    `;
    try {
        await db.run(query, [password, role, first_name, last_name, dob, address, phoneNumber]);
        console.log('Account updated successfully.');
    } catch (error) {
        console.error('Error updating account:', error);
    }
}

// Delete
async function deleteAccount(phoneNumber) {
    const query = 'DELETE FROM accounts WHERE phone_number = ?';
    try {
        await db.run(query, [phoneNumber]);
        console.log('Account deleted successfully.');
    } catch (error) {
        console.error('Error deleting account:', error);
    }
}

async function createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS accounts (
        phone_number TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        role TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        dob TEXT NOT NULL,
        address TEXT NOT NULL
      )
    `;
    try {
        await db.run(query);
        console.log('Table "accounts" created successfully.');
    } catch (error) {
        console.error('Error creating table "accounts":', error);
    }
}

// Hàm đăng nhập
async function login(phone_number, password) {
    try {
        const account = await getAccountByPhoneNumber(phone_number);
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

export {
    createAccount,
    getAccountByPhoneNumber,
    getAllAccounts,
    updateAccount,
    deleteAccount,
    createTable,
    login,
};