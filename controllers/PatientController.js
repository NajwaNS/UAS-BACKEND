const Patient = require("../models/Patient");

class PatientController {

  // Menampilkan semua pasien
  async index(req, res) {
    try {
      const patients = await Patient.all();  // Mengambil data pasien dari database

      const data = {
        message: "Menampilkan semua pasien",
        data: patients,
      };

      res.json(data);  // Mengirimkan respons berupa data pasien
    } catch (err) {
      res.status(500).json({ message: "Error fetching patients", error: err.message });
    }
  }

  // Menambahkan pasien baru
  async store(req, res) {
    try {
      const { name, phone, address, status, in_date_at, out_date_at } = req.body; 

      // Validasi input
      if (!name || !phone || !address || !status || !in_date_at) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Menambahkan pasien baru ke database
      const patient = await Patient.create({ name, phone, address, status, in_date_at, out_date_at });

      const data = {
        message: `Menambahkan data pasien: ${patient.name}`,
        data: patient,
      };

      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Error adding patient", error: err.message });
    }
  }

  // Menampilkan data pasien berdasarkan ID
  async show(req, res) {
    const { id } = req.params;
    try {
      const patient = await Patient.find(id);
      if (!patient) {
        return res.status(404).json({ message: `Pasien dengan id ${id} tidak ditemukan` });
      }
      res.json({ message: `Menampilkan data pasien dengan id ${id}`, data: patient });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Mengupdate data pasien
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, phone, address, status, in_date_at, out_date_at } = req.body;

      // Validasi input
      if (!name || !phone || !address || !status || !in_date_at) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Logika update data pasien
      const updatedPatient = await Patient.update(id, { name, phone, address, status, in_date_at, out_date_at });

      if (updatedPatient.affectedRows > 0) {
        res.json({
          message: `Pasien dengan ID ${id} berhasil diperbarui`,
          data: updatedPatient,
        });
      } else {
        res.status(404).json({ message: "Pasien tidak ditemukan" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error updating patient", error: err.message });
    }
  }

  // Menghapus pasien
  async destroy(req, res) {
    try {
      const { id } = req.params;

      // Menghapus data pasien dari database
      const deletedPatient = await Patient.delete(id);

      if (deletedPatient.affectedRows > 0) {
        res.json({
          message: `Pasien dengan ID ${id} berhasil dihapus`,
        });
      } else {
        res.status(404).json({ message: "Pasien tidak ditemukan" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting patient", error: err.message });
    }
  }

  // Mencari pasien berdasarkan nama
  async search(req, res) {
    const { name } = req.params;
    try {
      const patients = await Patient.search(name);
      if (patients.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      }
      res.status(200).json({ message: `Get detail resource ${name}`, data: patients });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Menampilkan pasien dengan status "positive"
  async positive(req, res) {
    try {
      const patients = await Patient.findByStatus("positive");
      res.status(200).json({
        message: "Get positive resource",
        total: patients.length,
        data: patients
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Menampilkan pasien dengan status "recovered"
  async recovered(req, res) {
    try {
      const patients = await Patient.findByStatus("recovered");
      res.status(200).json({
        message: "Get recovered resource",
        total: patients.length,
        data: patients
      });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Menampilkan pasien dengan status "dead"
  async dead(req, res) {
    try {
      const patients = await Patient.findByStatus("dead");
      res.status(200).json({
        message: "Get dead resource",
        total: patients.length,
        data: patients
      });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
}

const object = new PatientController();
module.exports = object;
