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
