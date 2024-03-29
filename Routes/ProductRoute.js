const express = require ('express');
const router = express.Router();
const { getProduct, createProduct, editProduct, deleteProduct, getProductById } = require('../controllers/productController');
const isAdmin = require('../Middleware/middleware-authorization')

router.get('/', getProduct);
router.get('/:id', getProductById)
router.post('/',isAdmin ,createProduct);
router.put('/:id',isAdmin ,editProduct);
router.delete('/:id',isAdmin, deleteProduct);

module.exports = router;