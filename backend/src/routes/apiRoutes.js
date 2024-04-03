import express from "express";

const taiKhoanController = require('../controllers/taiKhoanController');

const router = express.Router();

router.post('/taikhoan/dangki', taiKhoanController.handleNewUser);
router.get('/taikhoan/timkiem', taiKhoanController.getTaiKhoan);

export default router;
