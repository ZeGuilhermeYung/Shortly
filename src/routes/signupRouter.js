import { Router } from "express";
import { signup } from "../controllers/signupController.js";
import { signupValidation } from "../middlewares/signupValidationMiddleware.js";

const signupRouter = Router();

signupRouter.post("/signup", signupValidation, signup);

export default signupRouter;