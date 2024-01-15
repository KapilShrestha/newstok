import { Router } from 'express';
import { addComment, getAllComments, getCommentsByPostId } from '../controller/comments';


const router = Router();


router.post("/add", addComment);
router.get("/", getAllComments);
router.get("/:id", getCommentsByPostId);


export default router;