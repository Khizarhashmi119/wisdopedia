const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No token found! Access denied." }] });
  }

  try {
    const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
    req.admin = decodedPayload.admin;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ errors: [{ msg: err.message }] });
  }
};

module.exports = authMiddleware;
