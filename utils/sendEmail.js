const sgMail = require("@sendgrid/mail");
const { SENDGRID_KEY } = process.env;

//Calling method setApiKey from the object sgMail and giving it the key (to make mail listing)
sgMail.setApiKey(
  "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"
);

// a unique function that will send emails
const sendEmail = async ({ to, subject, html }) => {
  const email = {
    from: "alona.mykhaylenko@gmail.com",
    to,
    subject,
    html,
  };
  const result = await sgMail.send(email);
  return result;
};

module.exports = sendEmail;
