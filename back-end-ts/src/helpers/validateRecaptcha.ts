//this function is for authorizing recaptha . remember that recaptcha only works if environment config 'recaptcha' is true

import { ENV } from '#src/config/env.js';
import { Request } from 'express';

export default async function validateRecaptcha(req: Request) {
  const recaptchaToken = req.body.token;
  const secretKey = ENV.SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  const response = await fetch(verificationURL, { method: 'POST' });
  const data = await response.json();
  return data.success;
}
