import request from "supertest";
import { app } from "../src/api";

describe("Plan", () => {
    describe("Create", () => {
        it("should fail if we did not login", async () => {
            await request(app).post("/plan").expect(401);
        });

        it("should create a plan if we are logged in", async () => {
            const {body: user} = await request(app)
                .post("/login")
                .send({username: "admin",password:"admin"})
                .expect(200);
            const {body: plan} = await request(app)
                .post("/plan")
                .set("Authorization",user.id)
                .send({
                    title: "orumie",
                    description: "nice place"
            })
            .expect(200);
        expect(plan.title).toBe("orumie")    
        })
    })
})