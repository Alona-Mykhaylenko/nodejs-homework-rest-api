const contacts = require("../../model/contacts.json");

const updateContact = (req, res) => {
  const { contactId } = req.params;

  const idx = contacts.findIndex(({ id }) => id.toString() === contactId);

  if (idx === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  const updatedContact = { ...req.body, id: contactId };
  contacts[idx] = updatedContact;

  res.json({
    status: "sucess",
    code: 200,
    data: {
      result: updatedContact,
    },
  });
};

module.exports = updateContact;
