// backend/src/service/posts.ts

import { prismaClient } from "../../prisma/prismaClient";
import { IPost } from "../interface/post";

export const addPostService = async ({title, category, content}:IPost) => {
    try {
        const newPost = await prismaClient.post.create({
            data: {
                title,
                content,
                categories: {
                    connect: {
                        id: category
                    }
                },
                // author: {
                //     connect: {
                //         id: userId??''
                //     }
                // }
            }
        });
        return newPost;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAllPostsService = async () => {
    try {
        const posts = await prismaClient.post.findMany({
            include: {  categories: true },
            orderBy: {
                createdAt: 'desc',
            },
        });
          
            return posts;
        }
        catch (error) {
            console.error(error);
            throw error;
        }

}


// Example validation function
export const isValidCategoryService = async (categoryId: string): Promise<boolean> => {
    const category = await prismaClient.category.findUnique({
        where: { id: categoryId },
    });

    return !!category; 
};


export const deletePostService = async (postId: string) => {
    try {
        const deletedPost = await prismaClient.post.delete({
            where: {
                id: postId,
            },
        });
        return deletedPost;
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed to delete post. Error: ${error.message}.`);
    }

}
