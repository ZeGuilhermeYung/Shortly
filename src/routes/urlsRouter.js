import express from "express";
import { deleteUrl, openUrl, readUrl, shortUrl } from "../controllers/urls.controllers.js";
import { authValidation } from "../middlewares/token.middlewares.js";
import { schemaValidation } from "../middlewares/schemas.middlewares.js";
import { nonRepeatedUrlValidation, userHasUrlValidation } from "../middlewares/urls.middlewares.js";

const urlsRouter = express.Router();
urlsRouter.post("/urls/shorten", authValidation, schemaValidation("url"), nonRepeatedUrlValidation, shortUrl);
urlsRouter.get("/urls/:id", readUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);
urlsRouter.delete("/urls/:id", authValidation, userHasUrlValidation, deleteUrl);

export default urlsRouter;