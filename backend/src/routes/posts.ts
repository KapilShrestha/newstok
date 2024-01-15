import { Router } from 'express';
import { addPost, getAllPosts, deletePost } from '../controller/posts';

const router = Router();

router.get("/", getAllPosts);
router.post("/add", addPost);
router.delete("/:id", deletePost);


export default router;