// frontend/src/types.ts
export interface IUser {
  email: string;
  role: "ADMIN" | "AUTHOR" | "BASIC";
  name: string | null;
  isAdmin: boolean;
  isAuthor: boolean;
  // role:  "ADMIN"|"AUTHOR"|"BASIC";
  // name: string | null;
  // isAdmin: boolean;
  // isAuthor: boolean;
}

export interface ICategory {
  id: string;
  name: string;
}


export interface IPosts {
  createdAt: string | number | Date;
  id: string;
  title: string;
  content: string;
  categories: ICategory;
  author: IUser;

}

export interface IComment {
  id: string;
  content: string;
  post: IPosts;
}