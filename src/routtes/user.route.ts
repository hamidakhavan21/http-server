import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';



type userRole = "Admin" | "Rep" | "normal"

interface user {
    id: string,
    username: string,
    password: string,
    role : userRole
}


export const app = Router()


export const users : user[] = [
    {
        id: uuidv4(),
        username:"admin",
        password:"admin",
        role:"Admin"
    }
]


app.post("/login",(req,res)=>{
    const {username,password} =req.body;
    
    if(
        username == undefined || 
        typeof(username) != "string" && username.length == 0        
    ){
    res.status(400).send({message: "wrong Usename format"})
    return;
    }
    if(
        password == undefined || 
        typeof(password) != "string" && password.length == 0        
    ){
    res.status(400).send({message: "wrong format password"})
    return
    }

    const user = users.find(
        (x) => x.username == username && x.password == password
    );

    if(user == undefined){
        res.status(401).send({message: "invalid username or password"})
        return;
    }

    res.status(200).send(user);
});
