import express from "express";
import { signUp, singIn } from "../controllers/auth.controllers.js";
import { schemaValidation } from "../middlewares/schemas.middlewares.js";
import { signUpEmailValidation } from "../middlewares/users.middlewares.js";

const authRouter = express.Router();

authRouter.post("/signup", schemaValidation("signup"), signUpEmailValidation, signUp);
authRouter.post("/signin", schemaValidation("signin"), singIn);

export default authRouter;