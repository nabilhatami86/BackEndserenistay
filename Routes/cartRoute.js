const express = require('express');
const router = express.Router();
const { getCartProductById, getCartUserById } = require ("../controllers/cartController")

router.get("/cart/:id", getCartProductById);
router.get("/cart/:id", getCartUserById);

module.exports = router;