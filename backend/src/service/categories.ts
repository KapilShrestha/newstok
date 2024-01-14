// service/categories.ts


import { prismaClient } from '../../prisma/prismaClient';
import { ICategories } from '../interface/categories';

export const addCategoryService = async ({name}:ICategories) => {
    try {
        const lowercaseName = name.toLowerCase(); // Convert to lowercase
        const existingCategory = await prismaClient.category.findUnique({
            where: {
                name: lowercaseName,
            }
        });
        if (existingCategory) {
            throw new Error("Category already exists");
        }
        const newCategory = await prismaClient.category.create({
            data: {
                name,
            }
        });
        return newCategory;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed to add category. Error: ${error.message}.`);
    }
}

export const getAllCategoriesService = async () => {
    try {
        const categories = await prismaClient.category.findMany({
            orderBy: {
                createdAt: 'desc',
            },
    });
        return {data: categories};
    } catch (error) {
        return { error: 'An error occurred while adding the category' };
    }
}

export const deleteCategoryService = async (categoryId: string) => {
    try {
        const deletedCategory = await prismaClient.category.delete({
            where: {
                id: categoryId,
            },
        });
        return deletedCategory;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed to delete category. Error: ${error.message}.`);
    }
}



