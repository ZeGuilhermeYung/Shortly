import express from "express";
import { rankingUsers } from "../controllers/rankingControllers.js";

const rankingRouter = express.Router();

rankingRouter.get("/ranking", rankingUsers);

export default rankingRouter;