import express from "express";
import { signUp, signIn } from "../controllers/authControllers.js";
import { schemaValidation } from "../middlewares/schemasMiddlewares.js";
import { signUpEmailValidation } from "../middlewares/usersMiddlewares.js";

const authRouter = express.Router();

authRouter.post("/signup", schemaValidation("signup"), signUpEmailValidation, signUp);
authRouter.post("/signin", schemaValidation("signin"), signIn);

export default authRouter;