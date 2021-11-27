const express = require("express");
const router = express.Router();
const controller = require('../controllers/doctors.controllers');

router.get('/', controller.getAllDoctors);
router.post('/createNewDoctor', controller.createDoctor);
router.get('/:id', controller.getDoctorbyId);
router.put('/updateDoctor/:id', controller.updateDoctor);
router.delete('/deleteDoctor/:id', controller.deleteDoctor);
router.patch('/favorite/:id', controller.updateFavorite);

module.exports = router;