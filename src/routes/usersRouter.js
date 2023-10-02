import express from "express";
import { readUser } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/token.middlewares.js";

const usersRouter = express.Router();

usersRouter.get("/users/me", authValidation, readUser);

export default usersRouter;