import { Router } from 'express';
import { addPost } from '../controller/posts';
import { getAllPosts } from '../controller/posts';

const router = Router();

router.post("/add", addPost);
router.get("/", getAllPosts);


export default router;