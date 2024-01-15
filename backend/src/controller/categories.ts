// controller/categories.ts

import { Request, Response } from "express";
import { addCategoryService, getAllCategoriesService, deleteCategoryService, updateCategoryService, checkforExistingCategoryService } from '../service/categories';


export const addCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const existingCategory = await checkforExistingCategoryService(name);

        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }


        const newCategory = await addCategoryService({ name });
        res.status(201).json({ message: "New Category Created successfully", data: newCategory });

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }

}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const data = await getAllCategoriesService();
        console.log('Categories:', data); // Log the fetched data
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCategory = await deleteCategoryService(id);
        res.status(200).json({ message: 'Category deleted successfully', data: deletedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedCategory = await updateCategoryService(id, { name });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};