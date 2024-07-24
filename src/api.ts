import Express from "express";  
import { v4 as uuidv4 } from 'uuid';


type userRole = "Admin" | "Rep" | "normal"

interface user {
    id: string,
    username: string,
    password: string,
    role : userRole
}



interface plan {
    id: number,
    title: string,
    description: string,
}

const plans : plan [] = []

const users : user[] = [
    {
        id: uuidv4(),
        username:"admin",
        password:"admin",
        role:"Admin"
    }
]

const app = Express()
export {app}
app.use(Express.json());

app.use((req,res,next)=>{
    console.log(req.method,req.url)
    next()
})

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

app.post("/plan",(req,res)=>{
    const userID = req.headers["authorization"]

    const loggedInUser = users.find((x)=> x.id === userID)

    if(!loggedInUser){
        res.status(401).send({message: "Unauthorized"});
    }

    const { title, description } = req.body
    
    //validate
    if (
        title == undefined ||
        typeof title != "string" ||
        typeof title == "string" && title.length == 0
    ){
        res.status(400).send({message: "bad request"})
        return;
    }

    //create plan
    const plan = {
        id : plans.length + 1,
        title,
        description : description || "",
    };
    plans.push(plan)
    res.status(200).send(plan)
})
    
app.get("/plan/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    
    if(isNaN(id)){
        res.status(400).send({message : "bad request"})
        return;
    }
    
    const plan = plans.find((plan) => plan.id === id);
    if(plan == undefined){
        res.status(404).send({message: "plan not found"})
        return;
    }

    res.status(200).send(plan);
})

app.use((req,res)=>{
    res.status(404).send({message: "not found"})
})
