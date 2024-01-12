import { PrismaClient } from '@prisma/client'
import { IUser } from '../interface/user';

const prisma = new PrismaClient()

export const getAllUser = async () => {

    const user = await prisma.user.findMany({

    });
    const updatedUser = user.map((user) => {
        const {password, ...rest} = user;
        return rest;
    
    });
    
    // console.log(user, "match check");
    return updatedUser;
    

}