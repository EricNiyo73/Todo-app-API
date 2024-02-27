import supertest from "supertest";
import app from "./index.test";
import User from "../Models/userModel";

const request = supertest(app);
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
