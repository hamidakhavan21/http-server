import { Express } from "express";
import { Router } from "express";
import { users } from "./user.route";

interface plan {
    id: number,
    title: string,
    description: string,
}

const plans : plan [] = []

export const app = Router();

app.post("/",(req,res)=>{
    const userID = req.headers["authorization"]

    const loggedInUser = users.find((x)=> x.id === userID)

    if(!loggedInUser){
        res.status(401).send({message: "Unauthorized"});
        return
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


app.get("/:id",(req,res)=>{
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
