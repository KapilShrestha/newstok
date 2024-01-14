// routes/categoryRoutes.ts


import express from 'express';
import { getAllCategories, addCategory, deleteCategory } from '../controller/categories';


const router = express.Router();

router.get('/', getAllCategories);
router.post("/add", addCategory);
router.delete("/:id", deleteCategory);

export default router;
