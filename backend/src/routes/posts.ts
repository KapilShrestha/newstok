import { Router } from 'express';
import { add } from '../controller/posts';

const router = Router();

router.post("/add", add);



export default router;