const userRepository = require("../repositories/user.repository");
const STATUS = require("../constant/status.constant");
const { hashPassword, comaprePass } = require("../utils/token.utils");
const { generateToken } = require("../middlewares/authState.middleware");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Missing email or password",
      });
    }

    const isUserExist = await userRepository.getUserByEmail(email);
    if (isUserExist) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "User already exists",
      });
    }
    const hashPass = await hashPassword(password);
    const newUser = {
      name: req.body.username,
      email,
      password: hashPass,
    };

    const createUser = await userRepository.createUser(newUser);

    if (!createUser) {
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Register failed",
      });
    }
    return res.status(STATUS.CREATED).json({
      message: "Register successfully",
    });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Missing email or password",
      });

    const user = await userRepository.getUserByEmail(email);

    if (!user)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "User does not exist",
      });

    const isMatch = await comaprePass(password, user.password);

    if (!isMatch)
      return res.status(STATUS.BAD_REQUEST).json({
        message: "Wrong password",
      });

    const token = await generateToken(user._id);

    return res.status(STATUS.SUCCESS).json({
      message: "Login successfully",
      token,
    });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(STATUS.UNAUTHORIZED)
        .json({ message: "Access denied, token missing!" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res
          .status(STATUS.UNAUTHORIZED)
          .json({ message: "Invalid token" });
      return res
        .status(STATUS.SUCCESS)
        .json({ isValid: true, message: "Valid token" });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
