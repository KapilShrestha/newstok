// service/categories.ts

import { PrismaClient } from '@prisma/client';
import { CategoryCreateInput } from '../model/categories';

const prisma = new PrismaClient();

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
