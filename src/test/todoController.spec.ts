import { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index";
chai.use(chaiHttp);

describe("Todo Controller", () => {
  it("should create a new todo", async () => {
    const res = await chai.request(app).post("/api/todos/create").send({
      title: "Test Todo",
      description: "Test Description",
      completed: false,
    });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property("saveTodo");
    expect(res.body.saveTodo).to.have.property("title", "Test Todo");
  });
});
