import express from "express";
import { rankingUsers } from "../controllers/ranking.controllers.js";

const rankingRouter = express.Router();

rankingRouter.get("/ranking", rankingUsers);

export default rankingRouter;