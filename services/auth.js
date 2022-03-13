const jwt = require("jsonwebtoken");

const ROLES = {
  ADMIN: "admin",
  USER: "user",
};

function authRole(role) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log('role',jwt.decode(token).role)
    if (!jwt.decode(token).role||jwt.decode(token).role!==role) {
      res.sendStatus(401);
    }

    next();
  };
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, ROLES, authRole };
