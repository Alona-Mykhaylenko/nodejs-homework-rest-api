const { users: service } = require("../../services");

const verifyEmail = async (req, res, next) => {
  try {
    const { verifyToken } = req.params;
    // Searching for the user with this token
    const user = await service.getOne({ verifyToken });
    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    await service.update(user._id, { verify: true, verifyToken: null });
    res.json({
      status: "sucess",
      code: 200,
      message: "Email sucessfully verified",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
