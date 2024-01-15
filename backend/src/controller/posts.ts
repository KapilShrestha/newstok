//backend/src/controller/posts.ts

import { Request, Response } from "express";
import {addPostService, getAllPostsService, isValidCategoryService, deletePostService } from '../service/posts';
import {CONTENT_LENGTH, TITLE_LENGTH} from '../constant/constants';

export const addPost=async (req:Request, res:Response) => {
    try {
        const { title, category, content  } = req.body;

        if (title.length > TITLE_LENGTH ) {
            return res.status(400).json({ error: 'Content exceeds the maximum limit of 50 characters.' });
        }

        if (content.length > CONTENT_LENGTH ) {
            return res.status(400).json({ error: 'Content exceeds the maximum limit of 250 characters.' });
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

export const deletePost=async (req:Request, res:Response) => {
    try{
        const { id } = req.params;
        const deletedPost = await deletePostService(id);
        res.status(200).json({ message: 'Post deleted successfully', data: deletedPost });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

};
