const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      return next();
    }
    // If not authenticated, redirect to the login page
    res.redirect('/login');
  };
  
  module.exports = { isAuthenticated };