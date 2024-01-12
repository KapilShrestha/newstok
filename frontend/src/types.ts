// types.ts
export interface User {
  email: string;
  role:  "ADMIN"|"AUTHOR"|"BASIC";
  name: string | null;
  isAdmin: boolean;
  isAuthor: boolean;

    // Add any other properties you have in your User type
  }

  
