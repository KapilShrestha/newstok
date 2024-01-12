import { Prisma } from '@prisma/client';

export interface CategoryCreateInput {
  name: string;
}


export type CategoryModel = Prisma.CategoryCreateInput;