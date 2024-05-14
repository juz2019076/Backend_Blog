import { Router } from 'express';
import { check } from 'express-validator';
import { getPublications, 
         createPublication, 
         updatePublication, 
         deletePublication } from './publications.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.get('/', getPublications);

router.post('/', [
  check('title', 'Title is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('text', 'Text is required').not().isEmpty(),
  validarCampos
], 
createPublication);

router.put('/:id', [
  check('id', 'Not a valid ID').isMongoId(),
  validarCampos
], 
updatePublication);

router.delete('/:id', [
  check('id', 'Not a valid ID').isMongoId(),
  validarCampos
], 
deletePublication);

export default router;
