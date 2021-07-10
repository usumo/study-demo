const express = require('express');
const router = express.Router();
const StaffController = require('../controllers/staff');


router.get('/staff', StaffController.StaffList);
// router.post('/staff', StaffController.AddStaff);
// router.delete('/staff', StaffController.DeleteStaff);
// router.put('/staff', StaffController.UpdateStaff);
router.get('/staff/:id', StaffController.StaffDetail);


module.exports = router;