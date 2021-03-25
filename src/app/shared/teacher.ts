import { Person } from "./person";

export interface Teacher extends Person{
    name: string;
    surname: string;
    username: string;
    password: string;
    isTeacher: boolean;
}
