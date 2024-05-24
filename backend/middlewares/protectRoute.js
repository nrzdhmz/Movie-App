import jwt from "jsonwebtoken";
import prisma from "./../prismaClient/index.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // No token in the request
    if (!token) return res.status(401).json({ error: "No Token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
