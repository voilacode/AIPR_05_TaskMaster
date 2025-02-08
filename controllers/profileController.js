const userModel = require('../models/userModel');

exports.getProfile = (req, res) => {
  console.log("Session Data:", req.session); // Debugging session content
  console.log("Session UserId:", req.session.userId); // Check if userId exists
  
  const userId = req.session.user.id;

  // Check if userId is present in the session
  if (!userId) {
    console.log("User not logged in, redirecting to /login"); // Debugging message
    return res.redirect('/login'); // Redirect to login if no userId is found
  }

  userModel.findUserById(userId, (err, results) => {
    if (err || results.length === 0) {
      console.log("User not found, redirecting to /login"); // Debugging message
      return res.redirect('/login');
    }

    const user = results[0];
    console.log("User found for profile:", user); // Debugging message
    res.render('profile', { user });
  });
};
