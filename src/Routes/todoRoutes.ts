import Router from "express";
const router = Router();
import authentication from "../Middlewares/mustHaveAccount";
import {
  create,
  findAllTodo,
  findOneTodo,
  updateT,
  deleteT,
} from "../Controllers/todoController";
router.post("/create", authentication, create);
router.get("/", findAllTodo);
router.get("/:id", findOneTodo);
router.put("/:id", authentication, updateT);
router.delete("/:id", authentication, deleteT);
export default router;
