const express = require ('express');
const router = express.Router();
const { getProduct, createProduct, editProduct, deleteProduct, getProductById } = require('../controllers/productController');

router.get('/', getProduct);
router.get('/:id', getProductById)
router.post('/', createProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct)

module.exports = router;