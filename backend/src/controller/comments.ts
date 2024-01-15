//backend/src/controller/posts.ts

import { Request, Response } from "express";
import { addCommentService } from '../service/comments';

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

