// import database
const db = require("../config/database");

class Patient {

  // Menampilkan semua pasien
  static all() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patient";

      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Menambahkan pasien baru
  static create({ name, phone, address, status }) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO patient (name, phone, address, status) VALUES (?, ?, ?, ?)";
      db.query(query, [name, phone, address, status], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results); // Mengembalikan hasil insert
        }
      });
    });
  }

  // Mengupdate data pasien
  static update(id, { name, phone, address, status }) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE patient
        SET name = ?, phone = ?, address = ?, status = ?
        WHERE id = ?`;
      db.query(query, [name, phone, address, status, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results); // Mengembalikan hasil update
        }
      });
    });
  }

  // Menghapus pasien
  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM patient WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results); // Mengembalikan hasil delete
        }
      });
    });
  }
}

module.exports = Patient;
