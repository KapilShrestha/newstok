import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import config from '../config';
import { allUsers, users } from '../model/users';
import { ISignUp } from '../interface/auth';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constant/jwt';
import { getUsers } from '../model/users';

const SALT_ROUNDS = 10;

export const signup = async (body: ISignUp) => {
    bcrypt.hash(body.password, SALT_ROUNDS, async (err, hash) => {
        console.log({ hash });
        const user = {
            // id: users.length + 1,
            name: body.name,
            email: body.email,
            password: hash,
        };
        // await users.push(user);
        await prisma.user.create({
            data: {
              ...user
            },
          })

    });
    
    return;
};

export const login = async (body: ISignUp) => {

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
    
    console.log(user, "match check");
    try {
        const passwordMatch = await bcrypt.compare(body.password, user?.password??'');
        if (!passwordMatch) {
            throw new Error("Invalid password");
        }
        const accessToken = jwt.sign(user??{}, config.jwt.accessTokenSecret!, {
            expiresIn: ACCESS_TOKEN_EXPIRY,
        });
        const refreshToken = jwt.sign(user??{}, config.jwt.refreshTokenSecret!, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        });
        console.log({ accessToken, refreshToken });
        return { 
            accessToken, 
            refreshToken 
        };
    } catch (error: any) {
        console.log(error.message);
        return { error: error.message };
    }
}

