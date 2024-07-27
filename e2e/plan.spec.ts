import request from "supertest";
import { app } from "../src/api";
const login = async () => {
    const { body: user } = await request(app)
    .post("/login")
    .send({username: "admin", password: "admin"})
    .expect(200);
return user
}
const title = "orumie"

describe("Plan", () => {
    describe("Create", () => {
        
        it("should fail if we did not login", async () => {
            await request(app).post("/plan").expect(401);
        });

        it("should create a plan if we are logged in", async () => {
            const user = await login();
            const {body: plan} = await request(app)
                .post("/plan")
                .set("Authorization",user.id)
                .send({
                    title: title,
                    description: "nice place",
                    deadLine: "2024-02-02",
            })
            .expect(200);
        expect(plan.title).toBe("orumie")    
        })
        it("should send bad request if title is not provided", async () => {
            const user = await login();
            const {body: plan} = await request(app)
                .post("/plan")
                .set("Authorization",user.id)
                .send({
                    title: "",
                    description: "nice place",
                    deadLine: "2024-02-03",

        })
        .expect(400);
        })
    describe("Read",()=>{
        it("should read the plan",async () => {
            const user = await login()
            const {body: plan} = await request(app)
                .post("/plan")
                .set("Authorization",user.id)
                .send({
                    title: title,
                    description: "nice place",
                    deadLine: "2025-02-02"
            })
            console.log(plan)            
            const {body: resultPlan} = await request(app)
            .get("/plan/"+plan.id)
            .expect(200)
        expect(resultPlan.title).toBe(title)
        })
    })
    })
})
