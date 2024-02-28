import supertest from "supertest";
import app from "./index.test";
import Todo from "../Models/todoModel";
import User from "../Models/userModel";
const request = supertest(app);
let auth = {};

// beforeAll(async () => {
//   await Todo.deleteMany({});
// });
describe("Todo", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZGU0NTViZDNjMzJiMGI1ZDU2ZmUwMCIsImlhdCI6MTcwOTA3NDUyOCwiZXhwIjoxNzA5MTYwOTI4fQ.sgp8EiiQ_hxA8Ha9G_xemO-sBZaFEXM2kDOXuYB6dRY";
  const id = "65de76f09dcfa44f6ea673c4";

  it("should return 409 if Todo title already exists", async () => {
    const todoData = {
      title: "Test Todo",
      description: "Test Todo content",
    };

    const res = await request
      .post("/api/todos/create")
      .set("Authorization", `${token}`)
      .send(todoData);

    expect(res.status).toEqual(409);
    expect(res.body).toHaveProperty("message");
  });

  it("should create a new Todo", async () => {
    const todoData = {
      title: "Test todo my yTodo",
      description: "Test Todocontent",
    };

    const res = await request
      .post("/api/todos/create")
      .set("Authorization", ` ${token}`)
      .send(todoData);

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
  });

  it("should  fail when todo id not found ", async () => {
    const todoid = "65de7693b11edf52a24b3cfd";
    const res = await request.get(`/api/todos${todoid}`);
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("message");
  });

  it("should  retrieve all  todos and return success ", async () => {
    const res = await request.get(`/api/todos`);
    expect(res.status).toEqual(200);
  });
  it("should retrieve single todo and return success ", async () => {
    const res = await request.get(`/api/todos/${id}`);
    // expect(res.body).toHaveProperty("data");
    expect(res.status).toEqual(200);
  });
  it("should update todo and return success ", async () => {
    const todoData = {
      title: "Test Todo",
      description: "Test Todo content",
    };
    const res = await request
      .put(`/api/todos/${id}`)
      .send(todoData)
      .set("Authorization", `${token}`);
    expect(res.body).toHaveProperty("data");
    expect(res.status).toEqual(200);
  });
  it("should  delete a todo and return success ", async () => {
    const res = await request
      .delete(`/api/todos/${id}`)
      .set("Authorization", `${token}`);
    expect(res.status).toEqual(204);
    return;
  });
});

describe("POST /api/users/signup", () => {
  it("should return 409 Email  already exists", async () => {
    const res = await request.post("/api/users/signup").send({
      email: "test1@test.com",
      password: "password",
    });

    expect(res.status).toEqual(409);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /api/users/signup", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  it("should return 400 if email is missing", async () => {
    const res = await request
      .post("/api/users/signup")
      .send({ password: "password" });

    expect(res.status).toBe(400);
    expect(res.text).toContain('"email" is required');
  });

  it("should return 400 if password is too short", async () => {
    const res = await request
      .post("/api/users/signup")
      .send({ email: "test@example.com", password: "123" });

    expect(res.status).toBe(400);
    expect(res.text).toContain(
      '"password" length must be at least 8 characters long'
    );
  });

  it("should return 400 for invalid data", async () => {
    const res = await request
      .post("/api/users/signup")
      .send({ email: "invalid-email", password: "123456789" });

    expect(res.status).toBe(400);
    expect(res.text).toContain('"email" must be a valid email');
  });

  it("should POST a new user", async () => {
    const res = await request.post("/api/users/signup").send({
      email: "test1@test.com",
      password: "password",
    });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /api/users/login", () => {
  let token: string;

  it("should log in a user", async () => {
    const res = await request.post("/api/users/login").send({
      email: "test1@test.com",
      password: "password",
    });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("message");
    token = res.body.user;
    expect(res.body).toHaveProperty("token");
  });

  it("should return 404 for invalid password and email", async () => {
    const res = await request.post("/api/users/login").send({
      email: "invalid",
      password: "invalid",
    });

    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("message");
    // expect(res.status).toHaveBeenCalledWith(500);
    // expect(res.body.message.should.be).toEqual("Internal Server Error");
  });

  //   it("should return 401 for error logging in", async () => {
  //     const res = await request.post("/api/users/login").send({
  //       username: "test",
  //       password: "error",
  //     });

  //     expect(res.status).toEqual(401);
  //     expect(res.body).toHaveProperty("status");
  //     expect(res.body).toHaveProperty("message");
  //   });
});
