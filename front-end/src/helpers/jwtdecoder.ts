//this function decodes jwt token
import { jwtVerify } from "jose";

export const jwtdecoder = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_KEY);

    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    // توکن خراب یا منقضی
    return null;
  }
};
