import express from "express";
import { readUser } from "../controllers/usersControllers.js";
import { authValidation } from "../middlewares/tokenMiddlewares.js";

const usersRouter = express.Router();

usersRouter.get("/users/me", authValidation, readUser);

export default usersRouter;