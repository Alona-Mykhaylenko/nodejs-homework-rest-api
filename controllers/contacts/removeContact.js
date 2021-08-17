const contacts = require("../../model/contacts.json");

const removeContact = (req, res) => {
  const { contactId } = req.params;
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }

  const removedContact = contacts[idx];
  contacts.splice(idx, 1);

  res.json({
    status: "sucess",
    code: 200,
    data: {
      result: removedContact,
    },
  });
};

module.exports = removeContact;
