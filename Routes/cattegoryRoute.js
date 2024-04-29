const express = require('express');
const router = express.Router();
const { getCattegory, createCattegory, deleteCattegory, updateCattegory } = require('../controllers/cattegoryController');
const isAdmin = require ('../Middleware/middleware-authorization')


router.get('/cattegory', getCattegory);
router.post('/category',  isAdmin,createCattegory);
router.put('/category/:id',  isAdmin,updateCattegory);
router.delete('/cattegory/:id',  isAdmin,deleteCattegory);

module.exports = router;
