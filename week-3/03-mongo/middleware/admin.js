// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers["username"]
    const password = req.headers["password"]

    if(username === 'admin' && password === 'pass'){
        next()
    }else{
        res.status(401).json('Unauthorized access')
        return
    }
}

module.exports = adminMiddleware;