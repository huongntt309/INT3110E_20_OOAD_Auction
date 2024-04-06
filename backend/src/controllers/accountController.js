// import các hàm CRUD từ db vào đây
import {
    createAccount,
    getAccountByPhoneNumber,
    getAllAccounts,
    updateAccount,
    deleteAccount,
    createTable,
    login,
} from '../services/accountService';

const handleCreateNewAccount = async (req, res) => {
    try {
        const { phone_number, password, role, first_name, last_name, dob, address } = req.body;
        // Kiểm tra xem có dữ liệu được gửi từ client không
        if (!phone_number || !password || !role || !first_name || !last_name || !dob || !address) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Gọi hàm tạo tài khoản mới từ db
        await createAccount({
            phone_number,
            password,
            role,
            first_name,
            last_name,
            dob,
            address
        });
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Hàm xử lý đăng nhập
const handleLogin = async (req, res) => {
    try {
        const { phone_number, password } = req.body;
        // Kiểm tra xem có dữ liệu được gửi từ client không
        if (!phone_number || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // Gọi hàm đăng nhập từ db
        // (chưa biết cách xử lý đăng nhập trong db của bạn, hãy thay thế login bằng hàm thích hợp)
        const loggedIn = await login(phone_number, password);
        if (loggedIn) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Hàm xử lý đăng xuất
const handleLogout = async (req, res) => {
    try {
        // Gọi hàm đăng xuất từ db
        // (chưa biết cách xử lý đăng xuất trong db của bạn, hãy thay thế logout bằng hàm thích hợp)
        await logout();
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Hàm xử lý đăng xuất
const handleCreateTable = async (req, res) => {
    try {
        await createTable();
        res.status(200).json({ message: 'handleCreateTable successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { 
    handleCreateNewAccount,
    handleLogin,
    handleLogout,
    handleCreateTable,
}