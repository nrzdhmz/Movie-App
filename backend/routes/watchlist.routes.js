import { Router } from "express";
import { addWatchlistController } from "../controllers/watchlist.controller.js";
import protectRoute from "./../middlewares/protectRoute.js";

const router = Router();

router.post("/add", protectRoute, addWatchlistController);

export default router;
