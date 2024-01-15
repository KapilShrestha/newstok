import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import config from '../config';

import {  createUser } from '../model/users';
import { ISignUp } from '../interface/auth';
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constant/jwt';

const SALT_ROUNDS = 10;

export const signup = async (body: ISignUp) => {
    bcrypt.hash(body.password, SALT_ROUNDS, async (err, hash) => {
        const user = {
            name: body.name,
            email: body.email,
            password: hash,
        };
        await createUser(user);

    });
    
    return;
};

export const login = async (body: ISignUp) => {

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    });
    
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
        return { 
            accessToken, 
            refreshToken 
        };
    } catch (error: any) {
        return { error: error.message };
    }
}



