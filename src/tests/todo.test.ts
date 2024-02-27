import request from "supertest";
import fs from "fs";
import path from "path";
import app from "./index.test";
import Blog from "../src/models/blog";

describe("Blog", () => {
  let token: string;

  beforeAll(async () => {
    // Simulating login and getting token
    const response = await request(app).post("/api/login").send({
      username: "test",
      password: "password",
    });
    token = response.body.data;
  });

  it("should return 409 if blog title and content already exist", async () => {
    const blogData = {
      blogTitle: "Test t blog",
      blogContent: "Test t blog content",
    };

    // Simulating attachment of blog image
    const res = await request(app)
      .post("/api/blog")
      .set("Authorization", `Bearer ${token}`)
      .attach(
        "blogImage",
        fs.readFileSync(path.join(__dirname, "blog5.jpg")),
        "blog5.jpg"
      )
      .field("blogTitle", blogData.blogTitle)
      .field("blogContent", blogData.blogContent);

    expect(res.status).toBe(409);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toBeDefined();
  });
});
