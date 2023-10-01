import express from "express";
import signinRouter from "./signinRouter.js";
import signupRouter from "./signupRouter.js";
import urlsRouter from "./urlsRouter.js";
import usersRouter from "./userRouter.js";

const router = express.Router();
router.use(signinRouter);
router.use(signupRouter);
router.use(urlsRouter);
router.use(usersRouter);

export default router;