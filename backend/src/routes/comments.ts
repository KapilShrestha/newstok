import { Router } from 'express';
import { addComment } from '../controller/comments';

const router = Router();


router.post("/add", addComment);


export default router;