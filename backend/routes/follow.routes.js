import { Router } from "express";
import protectRoute from "./../middlewares/protectRoute.js";
import {
  getFollowingController,
  getFollowerController,
  addFollowingController,
  removeFollowingController,
} from "./../controllers/follow.controllers.js";

const router = Router();

router.get("/following", protectRoute, getFollowingController);
router.get("/followers", protectRoute, getFollowerController);
router.post("/following", protectRoute, addFollowingController);
router.delete("/followers", protectRoute, removeFollowingController);

export default router;
