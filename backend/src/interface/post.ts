// backend/src/interface/post.ts
export interface IPost {
    title: string;
    content: string;
    category: string;
    userId?: string;
}