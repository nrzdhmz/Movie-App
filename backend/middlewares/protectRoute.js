import jwt from "jsonwebtoken";
import prisma from "./../prismaClient/index.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // No token in the request
    if (!token) return res.status(401).json({ error: "No Token" });

    const decoded = jwt.verify(
      token,
      "788532b2693e023ffd557ee0d66f7e98a435b823ed92589bfed6af29de5807c276438049fb1bd5e1b4e8b8fb5f81f9304985c79d80a3835fc22490b35b62beda"
    );

    if (!decoded) return res.status(401).json({ error: "Invalid Token" });

    const user = await prisma.user.findFirst({
      where: { id: decoded.userId },
      select: { username: true, id: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err);
  }
};

export default protectRoute;
