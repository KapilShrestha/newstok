import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import config from "../config";
export const auth = async(req: any, res: Response, next:NextFunction) => {
    try{
        const token = req.headers.authorization?.split(" ")[1] as string;

        if(!token){
            res.status(401).json({ message: "Token not Found"});
        }

        const decode = jwt.verify(token, config.jwt.accessTokenSecret!);
        req.user = decode;
        next();

    }catch(err){
        res.status(401).json({
            message: "Authentication failed",
        });
    }
};