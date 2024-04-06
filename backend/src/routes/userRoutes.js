import express from "express";

const accountController = require('../controllers/accountController');

const router = express.Router();

// router.post('/taikhoan/dangki', taiKhoanController.handleNewUser);
// router.get('/taikhoan/timkiem', taiKhoanController.getTaiKhoan);
router.post('/sign-up', accountController.handleCreateNewAccount);

export default userRouter;
