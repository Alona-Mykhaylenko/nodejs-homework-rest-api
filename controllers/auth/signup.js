const gravatar = require("gravatar");
const { users: service } = require("../../services");
const { sendEmail } = require("../../utils");
const { nanoid } = require("nanoid");

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await service.getOne({ email });
    if (user) {
      return res.status(409).json({
        status: "conflict",
        code: 409,
        message: "Email in use",
      });
    }

    // Create link to the user's avatar with Gravatar.
    // Save url in the avatarUrl field during user creation
    req.body.avatarURL = gravatar.url(email);

    // const verifyToken = "jjnjkfncnjcsnvjf";

    const verifyToken = nanoid();
    // attaching token to the user
    const userData = await service.add({ ...req.body, verifyToken });

    // await service.update(_id, { verifyToken });
    // saving current address of the site in the variables of the surroundings
    const { URL } = process.env;
    const verificationEmail = {
      to: userData.email,
      subject: "Verify email",
      // a special link that will reroute the user to a special route where he will be verified
      html: `<a href="${URL}/api/v1/auth/verify/${verifyToken}" target ="_blank">Verify email</a>`,
    };
    await sendEmail(verificationEmail);
    res.status(201).json({
      status: "created",
      code: 201,
      message: "Successfully registered. Please verify email",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
