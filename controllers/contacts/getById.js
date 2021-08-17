const contacts = require("../../model/contacts.json");

const getById = (req, res) => {
  const { contactId } = req.params;

  const result = contacts.find((item) => item.id.toString() === contactId);
  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  res.json({
    status: "sucess",
    code: 200,
    data: { result },
  });
};

module.exports = getById;
