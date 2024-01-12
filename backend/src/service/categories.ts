// service/categories.ts

import { PrismaClient } from '@prisma/client';
import { CategoryCreateInput } from '../model/categories';

const prisma = new PrismaClient();

// Get all categories
export const getAllCategories = async () => {

  const categories = await prisma.user.findMany({

  });
  return categories;
  

}

export const createCategory = async (data: CategoryCreateInput) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: data.name, // Make sure 'data' has a 'name' property
      },
    });

    return newCategory;
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it at the calling function
  }
};
