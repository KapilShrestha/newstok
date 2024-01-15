// routes/categoryRoutes.ts


import express from 'express';
import { getAllCategories, addCategory, deleteCategory, updateCategory } from '../controller/categories';


const router = express.Router();

router.get('/', getAllCategories);
router.post("/add", addCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

export default router;
