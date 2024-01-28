const withAuth = (req, res, next) => {
    // request callback fx checking for session property 
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        // if user id exists call next()
        // another middleware 
        next();
    }
};

module.exports = withAuth;