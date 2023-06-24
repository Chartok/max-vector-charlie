function setSession(req, userData) {
    return new Promise((resolve, reject) => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;
            resolve();
        });
    });
}

module.exports = setSession;
