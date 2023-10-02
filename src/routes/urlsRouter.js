import express from "express";
import { deleteUrl, openUrl, readUrl, shortUrl } from "../controllers/urlsControllers.js";
import { authValidation } from "../middlewares/tokenMiddlewares.js";
import { schemaValidation } from "../middlewares/schemasMiddlewares.js";
import { nonRepeatedUrlValidation, userHasUrlValidation } from "../middlewares/urlsMiddlewares.js";

const urlsRouter = express.Router();
urlsRouter.post("/urls/shorten", authValidation, schemaValidation("url"), nonRepeatedUrlValidation, shortUrl);
urlsRouter.get("/urls/:id", readUrl);
urlsRouter.get("/urls/open/:shortUrl", openUrl);
urlsRouter.delete("/urls/:id", authValidation, userHasUrlValidation, deleteUrl);

export default urlsRouter;