import { Router } from "express";
import authRoutes from "./auth";
import categoryRoutes from "./categories";
import userRoutes from "./user";
import postRoutes from "./posts";
const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/posts", postRoutes );
router.use("/user", userRoutes)
export default router;