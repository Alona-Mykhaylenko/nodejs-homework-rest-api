const jwt = require("jsonwebtoken");
const { users: service } = require("../../services");

const signin = async (req, res, next) => {
  try {
    // getting email and password from the request body
    const { email, password } = req.body;
    // check if user exists
    const user = await service.getOne({ email });
    if (!user || !user.verify || !user.comparePassword(password)) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    const payload = {
      id: user._id,
    };
    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY);
    await service.update(user._id, { token });
    res.json({
      status: "OK",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signin;
