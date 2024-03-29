const express = require('express');
const router = express.Router();
const {  createAddress, getAddressById, editAddress, deleteAddress } = require('../controllers/addressController');

// Router untuk mendapatkan alamat berdasarkan token
router.get('/address/:id', getAddressById);
router.post('/address', createAddress);
router.put('/address/:id', editAddress);
router.delete('/address/:id', deleteAddress)

module.exports = router;
