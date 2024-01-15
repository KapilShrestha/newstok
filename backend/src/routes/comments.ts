import { Router } from 'express';
import { addComment, getAllComments } from '../controller/comments';


const router = Router();


router.post("/add", addComment);
router.get("/", getAllComments);


export default router;