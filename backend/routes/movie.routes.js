import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  filterMoviesController,
  getMovieController,
} from "../controllers/movie.controller.js";

const router = Router();

router.get("/get/:movieId", protectRoute, getMovieController);
router.get("/:movieQuery", protectRoute, filterMoviesController);

export default router;
