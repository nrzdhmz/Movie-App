import { Router } from "express";
import protectRoute from "./../middlewares/protectRoute.js";
import {
  addWatchlistController,
  getWatchlistController,
  updateMovieStatusController,
  removeMovieController,
} from "../controllers/watchlist.controller.js";

const router = Router();

router.post("/", protectRoute, addWatchlistController);
router.patch("/", protectRoute, updateMovieStatusController);
router.get("/", protectRoute, getWatchlistController);
router.delete("/:movieId", protectRoute, removeMovieController);

export default router;
