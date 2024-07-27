import Express from "express";  
import { app as planRoutes} from "./routes/plan.route";
import { app as userRoutes} from "./routes/user.route";
import { app as programRoutes } from "./routes/program.route";

const app = Express()
export {app}
app.use(Express.json());

app.use("/plan",planRoutes)
app.use(userRoutes)
app.use("/program",programRoutes)

app.use((req,res,next)=>{
    console.log(req.method,req.url)
    next()
})

app.use((req,res)=>{
    res.status(404).send({message: "not found"})
})