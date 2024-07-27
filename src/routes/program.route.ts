import { Router } from "express"
import { users } from "./user.route"
interface Program {
    id: number,
    planID: number,
    title: string,
    description: string
}


export const app = Router()

app.post("/",(req,res) => {
    const userID = req.headers["authorization"]
    
    const loggedInUser = users.find((x) => x.id === userID)
    
    if (!loggedInUser){
        res.status(401).send({message: "Unauthorized"})
        return;
    }
});