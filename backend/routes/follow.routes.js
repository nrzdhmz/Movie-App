import { Router } from "express";
import protectRoute from "./../middlewares/protectRoute.js";

const router = Router();

router.get(protectRoute, "/following");
router.get(protectRoute, "/followers");
router.post(protectRoute, "/followers");
router.delete(protectRoute, "/followers");
