const express = require ('express')
const router = express.Router();
const {getTipe, createTipe, updateTipe, deleteTipe, editTipe,} = require ('../controllers/tipeController.js');
const isAdmin = require ('../Middleware/middleware-authorization.js')

router.get('/tipe', getTipe);
router.post('/tipe', isAdmin,createTipe);
router.put('/tipe/:id', isAdmin,editTipe);
router.delete('/tipe/:id', isAdmin,deleteTipe);

module.exports = router;

