exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next()
    } else {
        console.log("User not authenticated");
        res.redirect('/auth/login')
    }
}