const express = require('express');
const router = express.Router();
const { getCattegory, createCattegory, deleteCattegory, updateCattegory } = require('../controllers/cattegoryController');
const isAdmin = require ('../Middleware/middleware-authorization')


router.get('/cattegory', getCattegory);
router.post('/category',  createCattegory);
router.put('/category/:id',  updateCattegory);
router.delete('/cattegory/:id',  deleteCattegory);

module.exports = router;
