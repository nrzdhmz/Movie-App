import { Router } from "express";
import protectRoute from "./../middlewares/protectRoute.js";
import { searchUsersController } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectRoute, searchUsersController);

export default router;
