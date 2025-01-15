// config/database.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // pastikan ini sesuai dengan username MySQL Anda
  password: "", // jika MySQL Anda tidak menggunakan password, biarkan kosong
  database: "express_covid_api", // pastikan nama database sudah benar
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

module.exports = db;
