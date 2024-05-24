import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getMovieController } from "../controllers/movie.controller.js";

const router = Router();

router.get("/get/:movieId", protectRoute, getMovieController);

export default router;
