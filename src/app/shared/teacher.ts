import { Person } from "./person";

export interface Teacher extends Person {
  username: string;
  password: string;
}
