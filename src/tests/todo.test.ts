import supertest from "supertest";
import app from "./index.test";
import Todo from "../Models/todoModel";
import User from "../Models/userModel";
const request = supertest(app);

describe("Todo", () => {
  let token: string;

  beforeAll(async () => {
    const signupResponse = await request.post("/api/nnnnusers/signupn").send({
      email: "test1@test.com",
      password: "password",
    });

    expect(signupResponse.status).toEqual(201);
    expect(signupResponse.body).toHaveProperty("user");
    expect(signupResponse.body).toHaveProperty("message");

    const loginResponse = await request.post("/api/users/login").send({
      email: "test1@test.com",
      password: "password",
    });

    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body).toHaveProperty("message");
    expect(loginResponse.body).toHaveProperty("token");
    token = loginResponse.body.token;
  });

  it("should return 409 if Todo title already exists", async () => {
    const todoData = {
      addedBy: "test@gmail.com",
      title: "Test Todo",
      description: "Test Todo content",
    };

    const res = await request
      .post("/api/todos/create")
      .set("Authorization", `${token}`)
      .send(todoData);

    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST a Todo", () => {
  let token: string;

  beforeAll(async () => {
    const signupResponse = await request.post("/api/users/signup").send({
      email: "test1@test.com",
      password: "password",
    });
    expect(signupResponse.status).toEqual(201);
    expect(signupResponse.body).toHaveProperty("user");
    expect(signupResponse.body).toHaveProperty("message");

    const loginResponse = await request.post("/api/users/login").send({
      email: "test1@test.com",
      password: "password",
    });

    expect(loginResponse.status).toEqual(200);
    expect(loginResponse.body).toHaveProperty("message");
    expect(loginResponse.body).toHaveProperty("token");
    token = loginResponse.body.token;
  });

  it("should create a new Todo", async () => {
    const todoData = {
      addedBy: "test@gmail.com",
      title: "Test Todo",
      description: "Test Todo content",
    };

    const res = await request
      .post("/api/todos/create")
      .set("Authorization", ` ${token}`)
      .send(todoData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("message");
    expect(res.body.data).toBeDefined();
    expect(res.body.data.title).toBe(todoData.title);
    expect(res.body.data.description).toBe(todoData.description);
  });
});
