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

const jwt = require("jsonwebtoken");

const createToken = (user) => {
    return jwt.sign({ user: user }, process.env.SECRET, { expiresIn: "20d" });
};

const accountController = {
    handleCreateNewAccount: async (req, res) => {
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
    },

    // Hàm xử lý đăng nhập
    handleLogin: async (req, res) => {
        try {
            const { phone_number, password } = req.body;
            // Kiểm tra xem có dữ liệu được gửi từ client không
            if (!phone_number || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }
            // Gọi hàm đăng nhập từ db
            // (chưa biết cách xử lý đăng nhập trong db của bạn, hãy thay thế login bằng hàm thích hợp)
            const loggedIn = await login(phone_number, password);
            if (loggedIn == false) {
                res.status(401).json({ error: 'Invalid credentials' });
            } else {
                const user = loggedIn
                const token = createToken(user);
                return res.status(200).json({ user: user, token: token });
            }
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hàm xử lý đăng xuất
    handleLogout: async (req, res) => {
        try {
            // Gọi hàm đăng xuất từ db
            // (chưa biết cách xử lý đăng xuất trong db của bạn, hãy thay thế logout bằng hàm thích hợp)
            await logout();
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            console.error('Error logging out:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hàm xử lý đăng xuất
    handleCreateTable: async (req, res) => {
        try {
            await createTable();
            res.status(200).json({ message: 'handleCreateTable successful' });
        } catch (error) {
            console.error('Error logging out:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hàm xử lý lấy danh sách tất cả người dùng
    handleGetAllUsers: async (req, res) => {
        try {
            const users = await getAllAccounts();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error getting all users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hàm xử lý lấy thông tin một người dùng dựa trên id
    handleGetUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await getAccountByPhoneNumber(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error getting user by id:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Hàm xử lý xóa người dùng dựa trên id
    handleDeleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            await deleteAccount(id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user by id:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
}


export default accountController;
