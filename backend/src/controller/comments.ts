//backend/src/controller/posts.ts

import { Request, Response } from "express";
import { addCommentService, getAllCommentsService, getCommentsByPostIdService } from '../service/comments';

import {CONTENT_LENGTH, TITLE_LENGTH} from '../constant/constants';

export const addComment=async (req:Request, res:Response) => {
    try {
        const { postId, content  } = req.body;

        const newComment = await addCommentService({ postId, content });
        res.status(201).json({ message : "New Comment Added successfully", data: newComment});

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getAllComments = async (req: Request, res: Response) => {
    try {
        const data = await getAllCommentsService();
        console.log('Comments:', data); // Log the fetched data
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getCommentsByPostId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await getCommentsByPostIdService( id);
        console.log('Comments:', data); // Log the fetched data
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
