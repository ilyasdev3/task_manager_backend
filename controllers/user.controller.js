const userRepository = require("../repositories/user.repository");
const STATUS = require("../constant/status.constant");

const getUserById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userRepository.getUserById(userId);
    if (!user)
      return res.status(STATUS.NOT_FOUND).json({
        message: "User does not exist",
      });

    return res.status(STATUS.SUCCESS).json({
      user,
    });
  } catch (err) {
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports = {
  getUserById,
};
