const express = require ('express')
const router = express.Router();

const {getTipe, createTipe, updateTipe, deleteTipe,} = require ('../controllers/tipeController.js');

router.get('/tipe', getTipe);
router.post('/tipe', createTipe);
router.put('/tipe/:id', updateTipe);
router.delete('/tipe/:id', deleteTipe);

module.exports = router;

