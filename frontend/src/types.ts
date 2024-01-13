// types.ts
export interface IUser {
  email: string;
  role:  "ADMIN"|"AUTHOR"|"BASIC";
  name: string | null;
  isAdmin: boolean;
  isAuthor: boolean;

    // Add any other properties you have in your User type
  }

  export interface ICategory {
    id: string;
    name: string;
    // role:  "ADMIN"|"AUTHOR"|"BASIC";
    // name: string | null;
    // isAdmin: boolean;
    // isAuthor: boolean;
  
      // Add any other properties you have in your User type
    }

  
