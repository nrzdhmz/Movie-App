import { Router } from "express";
import protectRoute from "./../middlewares/protectRoute.js";
import {
  searchUsersController,
  updateProfilePicture,
  getUserByIdController,
} from "../controllers/user.controller.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}${ext}`);
  },
});

const upload = multer({ storage });

router.get("/", protectRoute, searchUsersController);
router.post(
  "/profilePicture",
  protectRoute,
  upload.single("profilePicture"),
  updateProfilePicture
);
router.get("/:userId", protectRoute, getUserByIdController);

export default router;
