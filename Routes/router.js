const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/patientControllers");

// Routes 
router.post("/patient/register",controllers.patient_post);
router.get("/patient/details" ,controllers.patient_get);
router.get("/patient/:id" , controllers.single_patient_get);
router.put("/patient/edit/:id", controllers.edit_patient_detail);
router.delete("/patient/delete/:id", controllers.patient_delete);

module.exports = router;