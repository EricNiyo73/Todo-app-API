import { Router } from "express";
import TodoController from "../Controllers/todoController";
import authentication from "../Middlewares/mustHaveAccount";

const router = Router();

router.post("/create", authentication, TodoController.createTodo);
router.get("/", TodoController.findAllTodo);
router.get("/:id", TodoController.findOneTodo);
router.put("/update/:id", authentication, TodoController.updateTodo);
router.delete("/:id", authentication, TodoController.deleteT);

export default router;
