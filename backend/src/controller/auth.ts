import { Request, Response } from "express";
import * as authService from "../service/auth";

export const signup = async (req: Request, res: Response) => {
    const { body } = req;
    console.log(body);

    await authService.signup(body);
    return res.json({
        message: "Signup successful",
    });
};

export const login = async (req: Request, res: Response) => {
    const { body } = req;

    try{
        const data = await authService.login(body);
        return res.json(data);
    } catch(error){
        return res.status(401).json({
        message: "Unatuorized",
        });
    }
};

