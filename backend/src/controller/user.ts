import { Request, Response } from "express";
import * as userService from '../service/user';
// import { IUser } from '../interface/user';
export const getAllUser = async (req: Request, res: Response) => {
    

    const data = await userService.getAllUser();
    console.log(data, "user");
    return res.json(data);
};