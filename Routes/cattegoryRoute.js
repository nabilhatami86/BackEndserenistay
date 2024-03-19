const express  = require('express');
const router = express.Router();
const {getCattegory, createCattegory, deleteCattegory, updateCattegory} = require('../controllers/cattegoryController');


router.get('/cattegory', getCattegory);
router.post('/cattegory', createCattegory);
router.put('/cattegory/:id', updateCattegory);
router.delete('/cattegory/:id', deleteCattegory);

module.exports = router;