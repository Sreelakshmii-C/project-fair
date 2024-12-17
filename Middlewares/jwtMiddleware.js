const jwt = require('jsonwebtoken')


const jwtMiddleware = (req, res, next) => {
  console.log("inside jwtmiddleware ");

  try {
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    if (token) {
      const jwtVerification = jwt.verify(token, process.env.jwtKey)
      console.log(jwtVerification);
      req.payload = jwtVerification.userId
      next();

    }
    else {
      res.status(404).json("please provide the token")
    }
  }

  catch (err) {
    console.error(err); // Log the error for debugging
    res.status(401).json("Please login");

  }

}

module.exports = jwtMiddleware