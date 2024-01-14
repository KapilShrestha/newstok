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
  id: string;
  title: string;
  content: string;
  category: ICategory;
  author: IUser;

}