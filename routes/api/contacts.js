const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const { validateContact } = require("../../middleware/validateContact.js");

const router = express.Router();

router.get("/", ctrl.listContacts);
router.get("/:contactId", ctrl.getById);
router.delete("/:contactId", ctrl.removeContact);
router.post("/", validateContact, ctrl.addContact);
router.patch("/:contactId", validateContact, ctrl.updateContact);

module.exports = router;
