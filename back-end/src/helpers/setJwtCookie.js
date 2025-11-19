//this helper sets the jwt cookie as httpOnly cookie
const jwt = require("jsonwebtoken");

const setJwtCookie = (res,user) => {
  const token = jwt.sign(
    { _id: user.id, isAdmin: user.isadmin, verified: user.verified },
    process.env.JWT_KEY
  );
  //storing jwt token as a httpOnly cookie
  const mode = process.env.NODE_ENV;

  res.cookie("jwt", token, {
    httpOnly: true,
    path: "/",
    secure: mode === "production" ? true : false,
    sameSite: mode === "production" ? "None" : "Strict",
    maxAge: 604800000,
  });
};

module.exports = setJwtCookie;
