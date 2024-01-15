// backend/src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth";
import categoryRoutes from "./categories";
import userRoutes from "./user";
import postRoutes from "./posts";
import commentRoutes from "./comments";
const router = Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/posts", postRoutes );
router.use("/user", userRoutes);
router.use("/comments", commentRoutes )
export default router;