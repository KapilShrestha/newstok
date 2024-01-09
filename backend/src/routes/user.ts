import { Router } from "express";
import{
    createUser,
    deleteUser,
    getUsersById,
    getUsers,
    updateUser,
} from "../controller/user";
const router = Router();
router.get("/", getUsers);
router.get("/:id", getUsersById);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
export default router;