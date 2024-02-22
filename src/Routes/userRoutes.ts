import Router from "express";
const router = Router();
import { signup, login } from "../Controllers/userControllers";
router.post("/signup", signup);
router.post("/login", login);
export default router;
