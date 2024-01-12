import { Request, Response } from "express";
import * as userService from '../service/user';
export const getAllUser = async (req: Request, res: Response) => {
    const data = await userService.getAllUser();
    return res.json(data);
};