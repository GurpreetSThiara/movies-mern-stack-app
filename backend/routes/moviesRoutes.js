import express from "express";

const router = express.Router();
import {
  authenticate,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies
} from "../controllers/movieController.js";
import checkId from "../middlewares/checkId.js";

// routes for admins only
router.post("/movie/create", authenticate, authorizedAdmin, createMovie);
router.put("/movie/update/:id", authenticate, authorizedAdmin, updateMovie);
router.delete("/movie/delete/:id", authenticate, authorizedAdmin, deleteMovie);
router.delete("/comment/delete", authenticate, authorizedAdmin, deleteComment);

//routes for only auth users
router.post("movie/:id/reviews", authenticate, checkId, movieReview);

// public routes
router.get("/", getAllMovies);
router.get("/movie/:id", getSpecificMovie);
router.get("/movies/new", getNewMovies);
router.get("/movies/top", getTopMovies);
router.get("/movies/random", getRandomMovies);


export default router;
