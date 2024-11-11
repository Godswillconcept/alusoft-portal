const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  let token = req.headers["authorization"] || "";
  token = token.split(" ").pop(); // remove "Bearer "
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, process.env.JSON_KEY, (err, decoded) => {
    if (err) {
      if (err.code === "ERR_JWT_EXPIRED") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    req.username = decoded.username;
    req.password = decoded.password;
    next();
  });
};

module.exports = jwtVerify;
