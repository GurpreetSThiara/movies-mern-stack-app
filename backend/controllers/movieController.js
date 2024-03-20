import Movie from "../model/Movie.js";

const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getSpecificMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "movie not found" });
    }
    return res.json(movie);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ message: "movie not found" });
    }
    return res.json(updateMovie);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const movieReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const movie = await Movie.findById(id);

  try {
    if (!movie) {
      res.status(404).json({ message: "movie not found" });
    }
    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    movie.reviews.push(review);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;

    await movie.save();
    res.status(201).json({ message: "Review added" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(500).json({ error: e.message });
    }
    res.json({ message: "Movie deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }
    movie.reviews.splice(reviewIndex, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
          movieReview.reviews.length
        : 0;

    await movie.save();
    res.json({ message: "comment deleted succesfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getNewMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(movies);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getTopMovies = async(req,res) => {
    try{
        const movies = await Movie.find().sort({numReviews:-1}).limit(10)
        res.json(topRatedMovies)
    }catch(e){
        res.status(500).json({ error: e.message });

    }
}

const getRandomMovies = async (req,res) => {
    try{
        const movies = await Movie.aggregate([{$sample:{size:10}}])
        res.json(movies);
    }catch(e){
        res.status(500).json({ error: e.message });

    }
}

export {
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
};
