const express = require("express");
const router = express.Router();

// Pastikan path ke PatientController sudah benar
const PatientController = require("../controllers/PatientController"); // Periksa kembali path ini

// Menampilkan semua pasien
router.get("/patients", PatientController.index);

// Menambahkan pasien baru
router.post("/patients", PatientController.store);

// Menampilkan data pasien berdasarkan ID
router.get("/patients/:id", PatientController.show);

// Mengupdate data pasien
router.put("/patients/:id", PatientController.update);

// Menghapus pasien
router.delete("/patients/:id", PatientController.destroy);

// Mencari pasien berdasarkan nama
router.get("/patients/search/:name", PatientController.search);

// Menampilkan pasien dengan status "positive"
router.get("/patients/positive", PatientController.positive);

// Menampilkan pasien dengan status "recovered"
router.get("/patients/recovered", PatientController.recovered);

// Menampilkan pasien dengan status "dead"
router.get("/patients/dead", PatientController.dead);

module.exports = router;
