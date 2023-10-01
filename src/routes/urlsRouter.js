import { Router } from "express";
import { deleteUrl, getUrlById, openUrl, postUrl } from "../controllers/urlsController.js";
import { tokenValidation } from "../middlewares/tokenValidationMiddleware.js";
import { urlDeleteValidation } from "../middlewares/urlDeleteValidationMiddleware.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", tokenValidation, postUrl);
urlsRouter.get("/urls/:id", getUrlById);
urlsRouter.get("/urls/open/:shortUrl", openUrl);
urlsRouter.delete("/urls/:id", tokenValidation, urlDeleteValidation, deleteUrl);

export default urlsRouter;