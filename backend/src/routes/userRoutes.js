import express from "express";

const accountController = require('../controllers/accountController');

const router = express.Router();

// login logout
router.post('/sign-up', accountController.handleCreateNewAccount);
router.post('/login', accountController.handleLogin);
// router.post('/logout', accountController.handleLogout);

// for admin 
router.get('/user', accountController.handleGetAllUsers);
router.get('/user/:id', accountController.handleGetUserById);
router.delete('/user/:id', accountController.handleDeleteUserById);


export default router;
