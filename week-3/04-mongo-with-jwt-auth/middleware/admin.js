// Middleware for handling auth
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const {Admin} = require("../db/index")

function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  console.log(token)

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  const tokenWithoutBearer = token.replace("Bearer ", "");
  jwt.verify(tokenWithoutBearer ,jwtPassword, async (err, decoded) => {
    if(err){
        return res.status(400).json({error : 'error verifying the token'})
    }

    const username = decoded.username
    const userData = await Admin.findOne({username: username})

    if(!userData){
        return res.status(400).json({error : 'Invalid token. The user doesnt exist'})
    }
    next()

  })
}

module.exports = adminMiddleware;
