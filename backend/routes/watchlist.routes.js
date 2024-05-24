import { Router } from "express";
import protectRoute from "./../middlewares/protectRoute.js";
import {
  addWatchlistController,
  getWatchlistController,
  updateMovieStatus,
} from "../controllers/watchlist.controller.js";

const router = Router();

router.post("/add", protectRoute, addWatchlistController);
router.get("/get", protectRoute, getWatchlistController);
router.post("/update-status", protectRoute, updateMovieStatus);

export default router;
