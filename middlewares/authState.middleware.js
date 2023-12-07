const jwt = require("jsonwebtoken");
const STATUS = require("../constant/status.constant");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(STATUS.UNAUTHORIZED).send("Unauthorized");
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return res.status(STATUS.METHOD_NOT_ALLOWED).send("Forbidden");
      req.user = payload;
      next();
    });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
