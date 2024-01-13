// interface user
export interface IUser {
    id: string;
    email: string;
    role:  "ADMIN"|"AUTHOR"|"BASIC";
    name: string | null;
    isAdmin: boolean;
    isAuthor: boolean;
    
}