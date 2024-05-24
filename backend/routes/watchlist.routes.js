import { Router } from "express";
import {
  addWatchlistController,
  getWatchlistController,
} from "../controllers/watchlist.controller.js";
import protectRoute from "./../middlewares/protectRoute.js";

const router = Router();

router.post("/add", protectRoute, addWatchlistController);
router.get("/get", protectRoute, getWatchlistController);

export default router;
