import { Router } from 'express';
import { addPost } from '../controller/posts';
import { getAllPosts } from '../controller/posts';

const router = Router();

router.get("/", getAllPosts);
router.post("/add", addPost);


export default router;