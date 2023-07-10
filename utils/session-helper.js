setSession = async (req, userData) => {
    return new Promise((resolve, reject) => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;
            req.session.save(error => {
                if (error) {
                    console.error('There was an error saving the session');
                    console.log(session)
                    reject(error);
                } else {
                    resolve(req.session);
                }
        });
    });
}

module.exports = setSession;
