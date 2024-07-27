import request from "supertest"
import { app } from "../src/api"

describe("Program",() => {
    describe("create",() => {
        it("should fail if we did not login", async () => {
            await request(app)
            .post("/program")
            .expect(401)
        })
    })
})