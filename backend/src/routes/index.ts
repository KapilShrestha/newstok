import { Router } from "express";
import authRoutes from "./auth";
import categoryRoutes from "./categories";
import { auth } from "../middleware/auth";
const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
export default router;