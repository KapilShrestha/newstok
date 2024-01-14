// backend/src/model/users.ts

import { prismaClient } from '../../prisma/prismaClient'

export const createUser = async(data: any) => {
   return await prismaClient.user.create({
        data: {
          ...data
        },
      })
}