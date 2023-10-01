import { Router } from "express";
import { getRanking, getUser } from "../controllers/usersController.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users/me", tokenValidation, getUser);
usersRouter.get("/ranking", getRanking);

export default usersRouter;