// model/users.ts
import { PrismaClient } from '@prisma/client'	
const prisma = new PrismaClient()

export const createUser = async(data: any) => {
   return await prisma.user.create({
        data: {
          ...data
        },
      })
}