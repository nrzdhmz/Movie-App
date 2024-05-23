import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign(
    { userId },
    "788532b2693e023ffd557ee0d66f7e98a435b823ed92589bfed6af29de5807c276438049fb1bd5e1b4e8b8fb5f81f9304985c79d80a3835fc22490b35b62beda",
    {
      expiresIn: "15d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 3600 * 1000, // Milli seconds
    httpOnly: true, // Prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
