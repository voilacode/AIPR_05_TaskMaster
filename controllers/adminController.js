const userModel = require('../models/userModel');
exports.adminPage = (req, res) => {
  const currentUser = req.session.user;

  if (!currentUser) {
    return res.redirect('/login'); // Redirect if no user session is found
  }

  if (currentUser.role === 'user') {
    return res.redirect('/'); // Redirect if not an admin
  }

  userModel.getAllUsers((err, results) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }

    res.render('admin', { users: results, user: currentUser });
  });
};
