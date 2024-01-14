//backend/src/controller/posts.ts

import { Request, Response } from "express";
import {addPostService } from '../service/posts';
import { getAllPostsService } from '../service/posts';
import { isValidCategoryService } from '../service/posts';
import {CONTENT_LENGTH, TITLE_LENGTH} from '../constant/constants';

export const addPost=async (req:Request, res:Response) => {
    try {
        const { title, category, content  } = req.body;

        if (content.length > CONTENT_LENGTH ) {
            return res.status(400).json({ error: 'Content exceeds the maximum limit of 25 characters.' });
        }
        if (title.length > TITLE_LENGTH ) {
            return res.status(400).json({ error: 'Content exceeds the maximum limit of 10 characters.' });
        }

        const isValidCategory = await isValidCategoryService(category);
        if (!isValidCategory) {
            return res.status(400).json({ error : "Invalid Category" });
        }
        const newPost = await addPostService({ title, category, content });
        res.status(201).json({ message : "New Post Created successfully", data: newPost});

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getAllPosts=async (req:Request, res:Response) => {
    try {
        const data = await getAllPostsService();
        console.log('Posts:', data); // Log the fetched data
        return res.status(200).json(data);
    
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
