import { Request, Response } from "express";

export const add=async (req:Request, res:Response) => {
    try {
        const { name } = req.body;
        console.log(name);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}