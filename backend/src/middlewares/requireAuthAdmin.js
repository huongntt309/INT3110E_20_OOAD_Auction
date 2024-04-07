
const jwt = require("jsonwebtoken");

const requireAuthAdmin = async (req, res, next) => {
    try {
        // Lấy token từ header
        const token = req.headers.authorization.split(" ")[1];
        // Kiểm tra token
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded.user;
        // Kiểm tra vai trò
        console.log(decoded.user);
        // Kiểm tra vai trò
        if (decoded.user.role != 'admin') {
            return res.status(401).json({
                message: "Không có quyền truy cập",
            });
        }

        // Tiếp tục xử lý request
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token không hợp lệ",
        });
    }
};

module.exports = requireAuthAdmin;