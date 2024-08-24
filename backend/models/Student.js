const db = require('../db/database');

class Student {
  static create(name, areaOfInterest) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO students (name, area_of_interest) VALUES (?, ?)', [name, areaOfInterest], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = Student;