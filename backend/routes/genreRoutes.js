import express from "express";

const router = express.Router();
import { authenticate, authorizedAdmin } from '../middlewares/authMiddleware.js';
import { createGenre ,updateGenre,removeGenre ,listGenres,readGenre } from "../controllers/genreController.js";

router.route('/').post(authenticate ,authorizedAdmin, createGenre)
router.route('/:id').put(authenticate ,authorizedAdmin, updateGenre)
router.route('/:id').delete(authenticate ,authorizedAdmin, removeGenre)
router.route('/genres').get(listGenres)
router.route('/:id').get(readGenre)

export default router;





