// backend/src/service/posts.ts

import { prismaClient } from "../../prisma/prismaClient";
import { IComment } from "../interface/comments";


export const addCommentService = async ({postId, content}:IComment) => {
    try {
        const newComment = await prismaClient.comment.create({
            data: {
                content,
                post: {
                    connect: {
                        id: postId
                    }
                },
                // author: {
                //     connect: {
                //         id: userId??''
                //     }
                // }
            }
        });
        return newComment;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllCommentsService = async () => {
    try {
        const comments = await prismaClient.comment.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { data: comments };
    } catch (error) {
        return { error: 'An error occurred while adding the comment' };
    }
}

export const getCommentsByPostIdService = async (id:string) => {
    try {
        const comments = await prismaClient.comment.findMany({
            where: {
                postId: id
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { data: comments };
    } catch (error) {
        return { error: 'An error occurred while adding the comment' };
    }
}
