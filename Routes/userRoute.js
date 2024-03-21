const express = require('express');
const router = express.Router();
const { getUserByToken, register, updateProfile, logout, login } = require('../controllers/userController');
const isAdmin = require ('../Middleware/userMiddleware.js')

router.get('/user', getUserByToken);
router.post('/user/register', register);
router.post('/user/login', login);
router.put('/user/profile/:id', updateProfile);
router.get('/user', logout);
router.delete('/user/:id', isAdmin, (req, res) =>{

});

module.exports = router;

