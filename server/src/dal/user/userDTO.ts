import { Languages } from "../enums";

export class UserDTO {
    role: number; 
    name: string;
    email: string;
    password: string;
    language: Languages;
}