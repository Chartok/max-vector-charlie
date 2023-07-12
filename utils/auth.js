const withAuth = (req, res, next) => {

    if (!req.session.user_id) {
        res.redirect('/login');
        console.log(req.session.user_id);
    } else {
        next();
    }
}

module.exports = withAuth;
