import express from "express";

const accountController = require('../controllers/accountController');
const bidderController = require('../controllers/bidderController');

const requireAuthAdmin = require("../middlewares/requireAuthAdmin");
const requireAuthBidder = require("../middlewares/requireAuthBidder");

const router = express.Router();

// login logout
router.post('/sign-up', accountController.handleCreateNewAccount);
router.post('/login', accountController.handleLogin);
// router.post('/logout', accountController.handleLogout);

// for admin 
router.get('/account', accountController.handleGetAllUsers);
router.get('/account/:id', accountController.handleGetUserById);
router.delete('/account/:id', accountController.handleDeleteUserById);


export default router;
