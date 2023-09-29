import supertest from "supertest";

import app from "server";
import { FruitInput } from "services/fruits-service";

const api = supertest(app)

describe("/POST fruits", () => {
    it("should return status 201 when creating a fruit", async () => {
        const fruit: FruitInput = {
            name: "Morgando",
            price: 1
          };
      
          const { status } = await api.post("/fruits").send(fruit);
          expect(status).toBe(201);
    })
})

describe("/GET fruits", () => {
    it("should return all fruits", async () => {
        const { status, body } = await api.get("/fruits");
        expect(status).toBe(200);
        expect(body).toEqual(expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              price: expect.any(Number)
            })
          ]))
    })


    it("should return status 400 when id not a valid number", async()=> {
        const { status } = await api.get("/fruits/NaN");
        expect(status).toBe(400);
    })
})