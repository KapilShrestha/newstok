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
            include: {  categories: true }});
            return posts;
        }
        catch (error) {
            console.error(error);
            throw error;
        }

}