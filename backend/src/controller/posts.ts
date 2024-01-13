//controller/posts.ts

import { Request, Response } from "express";
import {addPostService } from '../service/posts';
import { getAllPostsService } from '../service/posts';
export const addPost=async (req:Request, res:Response) => {
    try {
        const { title, category, content  } = req.body;
        const newPost = await addPostService({ title, category, content });
        res.status(201).json(newPost);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getAllPosts=async (req:Request, res:Response) => {
    try {
        const data = await getAllPostsService();
        return res.status(200).json(data);
    
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
