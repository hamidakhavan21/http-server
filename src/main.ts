import http, { createServer, get } from "http"
import Express, { query } from "express"  
import { title } from "process";

interface plan {
    id: number,
    title: string,
    description: string,
}

const plans : plan [] = []

const app = Express()



app.use(Express.json());
app.use((req,res,next)=>{
    console.log(req.method,req.url)
    next()
})

app.post("/plan",(req,res)=>{
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

app.listen(3000,()=> {
    console.log("Server is listening on port 3000")
});


    // app.get("/home",(req,res) => {
//     const name = req.query.name
//     res.send({name:"Hello " + (name || "world")})
// })

// app.get("/service/:name",(req,res)=>{
//     const name = req.params.name;
//     res.send({name:"Hello " + (name || "world")})
// })

// app.post("/Dashboard",(req,res) => {
//     const name = req.body.name
//     res.send({name :"bye bye" + (name || "World")})
// })


// app.use((req,res)=>{
//     res.status(404).send({message: "Not Found"})
// })