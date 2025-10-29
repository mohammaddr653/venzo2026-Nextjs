//this function is for authorizing recaptha . remember that recaptcha only works if environment config 'recaptcha' is true

const validateRecaptcha = async (req) => {
  const recaptchaToken = req.body.token;
  const secretKey = process.env.SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  const response = await fetch(verificationURL, { method: "POST" });
  const data = await response.json();
  return data.success;
};
module.exports = validateRecaptcha;
