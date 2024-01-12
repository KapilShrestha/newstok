import { Request, Response } from "express";
import * as categoryService from '../service/categories';

export const getAllCategories = async (req: Request, res: Response) => {
    const data = await categoryService.getAllCategories();
    return res.json(data);
};