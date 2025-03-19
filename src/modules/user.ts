export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

export type Users = {
  [id: string]: User;
}