import { Router } from "express";
import { check } from "express-validator";
import {
    publicationsDelete,
    publicationsPost,
    publicationsPut,
    getPublicationsById
} from "./publications.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/:id", getPublicationsById);

router.post(
    "/",
    [
        check("title", "The title is mandatory").notEmpty(),
        check("category", "The category is mandatory").notEmpty(),
        check("text", "The text is required").notEmpty(),
        validarCampos,
    ],
    publicationsPost
);

router.put(
    "/:id",
    [
        check("title", "The title is mandatory").notEmpty(),
        check("category", "The category is mandatory").notEmpty(),
        check("text", "The text is required").notEmpty(),
        validarCampos,
    ],
    publicationsPut
);

router.delete(
    "/:id",
    [
        check("id", "Not a valid ID").isMongoId(),
        validarCampos,
    ],
    publicationsDelete
);

export default router;
