import express from "express";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser()); // to access the cookies

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server is running on 5000");
});
