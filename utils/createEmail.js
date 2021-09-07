const sendEmail = require("./sendEmail");

// creating the mail listing
const createEmail = (emailList) => {
  const requests = emailList.forEach((item) => sendEmail(item));
  Promise.allSettled(requests);
};

module.exports = createEmail;
