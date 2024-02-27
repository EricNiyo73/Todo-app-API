import supertest from "supertest";
import app from "./index.test";
import Todo from "../Models/todoModel";

const request = supertest(app);
describe("POST /api/users/create", () => {
  it("should return 409 Todo  already exists", async () => {
    const res = await request.post("/api/todos/create").send({
      title: "test1test",
      description: "test1testtest1test",
    });

    expect(res.status).toEqual(409);
    expect(res.body).toHaveProperty("message");
  });
});
// describe("POST /api/todos/create", () => {
//   beforeEach(async () => {
//     await Todo.deleteMany({});
//   });
//   it("should return 400 if title is missing", async () => {
//     const res = await request
//       .post("/api/todos/create")
//       .send({ description: "description" });

//     expect(res.status).toBe(400);
//     expect(res.text).toContain('"description" is required');
//   });

//   it("should POST a new todo", async () => {
//     const res = await request.post("/api/todos/create").send({
//       title: "test1test",
//       description: "test1testtest1test",
//     });

//     expect(res.status).toEqual(201);
//     expect(res.body).toHaveProperty("user");
//     expect(res.body).toHaveProperty("message");
//   });
// });
