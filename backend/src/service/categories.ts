// service/categories.ts


import { prismaClient } from '../../prisma/prismaClient';
import { ICategories } from '../interface/categories';

export const addCategoryService = async ({name}:ICategories) => {
    try {
        
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


export const updateCategoryService = async (id: string, { name }: ICategories) => {
    try {
        const updatedCategory = await prismaClient.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });

        return updatedCategory;
    } catch (error:any) {
        console.error(error);
        throw new Error(`Failed to update category. Error: ${error.message}.`);
    }
};

export const checkforExistingCategoryService = async (name: string) => {
    try {
        const existingCategory = await prismaClient.category.findMany({

            where: {
                name :{
                    equals: name,
                    mode: 'insensitive',
                }
                
            }
        });
        console.log(existingCategory, "some check message");
        
        if (existingCategory.length > 0) {
            return true;
        }
        return false;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed to add category. Error: ${error.message}.`);
    }
}