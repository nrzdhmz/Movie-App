import { Router } from "express";
import protectRoute from "./../middlewares/protectRoute.js";
import {
  addWatchlistController,
  getWatchlistController,
  updateMovieStatusController,
} from "../controllers/watchlist.controller.js";

const router = Router();

router.post("/", protectRoute, addWatchlistController);
router.get("/", protectRoute, getWatchlistController);
router.patch("/", protectRoute, updateMovieStatusController);

export default router;
