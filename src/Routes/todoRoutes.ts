import { Router } from "express";
import TodoController from "../Controllers/todoController";
import authentication from "../Middlewares/mustHaveAccount";

const router = Router();

router.post("/create", TodoController.createTodo);
router.get("/", TodoController.findAllTodo);
router.get("/:id", TodoController.findOneTodo);
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteT);

export default router;
