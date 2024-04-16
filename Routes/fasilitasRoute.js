const express = require('express');
const router = express.Router();
const { createFasilitas, editFasilitas, deleteFasilitas, getAllFasilitas, createFasilitasIds } = require ('../controllers/fasilitasController');

router.get("/fasilitas", getAllFasilitas);
// router.post('/fasilitas', createFasilitasIds);
router.post("/fasilitas", createFasilitas);
router.put("/fasilitas", editFasilitas);
router.delete("/fasilitas", deleteFasilitas);

module.exports = router