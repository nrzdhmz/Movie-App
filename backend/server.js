import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";

// Routes
import authRoutes from "./routes/auth.routes.js";
import watchlistRoutes from "./routes/watchlist.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import followRoutes from "./routes/follow.routes.js";
import userRoutes from "./routes/user.routes.js";

import prisma from "./prismaClient/index.js";
import multer from "multer";

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads")); // to serve the static files
app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to access the cookies

app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/users", userRoutes);

// Shutdow database connection on shutdown
const shutdown = async () => {
  try {
    await prisma.$disconnect();
    console.log("Disconnected from database");
    process.exit(0);
  } catch (error) {
    console.error("Error during disconnection", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
