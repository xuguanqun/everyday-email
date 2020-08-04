const myEmail = {
  address: "",
  password: "",
};
const sendEmail = {
  address: "",
  subject: "",
};
const errorEmail = {
  address: "",
};
const mailOption = {
  service: "qq",
  port: 465,
  secure: true,
  auth: {
    user: myEmail.address,
    pass: myEmail.password,
  },
};
module.exports = {
  myEmail,
  sendEmail,
  errorEmail,
  mailOption,
};
