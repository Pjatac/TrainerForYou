export class User{
    _id?: number;
    name: String;
    email: String;
    role: number;
    password: String;
    token?: String;
    
    constructor(name: String, email: String, role: number, password: String, id?: number, token?: String){
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this._id = id;
        this.token = token;
    }; 
}