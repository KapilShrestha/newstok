import { Router } from "express";   
const router = Router();
import { getAllUser } from "../controller/user";

router.get("/", getAllUser);
export default router;