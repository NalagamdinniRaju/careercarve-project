const db = require('../db/database');

class Mentor {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM mentors', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static findByAreaOfExpertise(area) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM mentors WHERE areas_of_expertise LIKE ?', [`%${area}%`], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = Mentor;