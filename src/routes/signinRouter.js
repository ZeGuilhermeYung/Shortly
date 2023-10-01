import { Router } from "express";
import { signin } from "../controllers/signinController.js";
import { signinValidation } from "../middlewares/signinValidationMiddleware.js";

const signinRouter = Router();

signinRouter.post("/signin", signinValidation, signin);

export default signinRouter;