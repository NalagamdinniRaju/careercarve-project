// const db = require('../db/database');

// class Booking {
//   static create(studentId, mentorId, duration, dateTime) {
//     return new Promise((resolve, reject) => {
//       db.run('INSERT INTO bookings (student_id, mentor_id, duration, date_time) VALUES (?, ?, ?, ?)',
//         [studentId, mentorId, duration, dateTime],
//         function(err) {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(this.lastID);
//           }
//         }
//       );
//     });
//   }

//   static getForMentor(mentorId) {
//     return new Promise((resolve, reject) => {
//       db.all('SELECT * FROM bookings WHERE mentor_id = ? ORDER BY date_time', [mentorId], (err, rows) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(rows);
//         }
//       });
//     });
//   }
// }




// module.exports = Booking;



const db = require('../db/database');

class Booking {
  static create(studentId, mentorId, duration, dateTime) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO bookings (student_id, mentor_id, duration, date_time) VALUES (?, ?, ?, ?)',
        [studentId, mentorId, duration, dateTime],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  static getForMentor(mentorId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM bookings WHERE mentor_id = ? ORDER BY date_time', [mentorId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  
}

module.exports = Booking;