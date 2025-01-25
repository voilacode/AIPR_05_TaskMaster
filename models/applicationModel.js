const db = require('../config/db');

const Application = {
  create: (application, callback) => {
    const sql = 'INSERT INTO applications (jobId, userName, userEmail) VALUES (?, ?, ?)';
    db.query(sql, [application.jobId, application.userName, application.userEmail], callback);
  },
};

module.exports = Application;