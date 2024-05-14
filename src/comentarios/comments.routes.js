import { Router } from 'express';
import { check } from 'express-validator';
import { createComment, 
        getCommentsByPublicationId } from './comments.controller.js';
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post(
    '/',
    [
        check('publicationId', 'Publication ID is required').notEmpty(),
        check('commenterName', 'Commenter name is required').notEmpty(),
        check('commenterEmail', 'Commenter email is required').isEmail(),
        check('commentText', 'Comment text is required').notEmpty(),
        validarCampos
    ],
    createComment
);

router.get('/:publicationId', getCommentsByPublicationId);

export default router;
