const express = require('express');
const router = express.Router();
const { getAddressByToken, createAddress, getAddressById } = require('../controllers/addressController');

// Router untuk mendapatkan alamat berdasarkan token
router.get('/address/token', getAddressByToken);
router.get('/address/:id', getAddressById);
router.post('/address', createAddress);

module.exports = router;
