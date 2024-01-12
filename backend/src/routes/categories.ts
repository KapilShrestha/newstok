// routes/categoryRoutes.ts


import express, { Request, Response } from 'express';
import { createCategory } from '../service/categories';

const router = express.Router();

router.post('/add', async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Validate input if necessary

    const newCategory = await createCategory({ name });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
