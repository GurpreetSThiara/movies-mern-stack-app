import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import cors from "cors";
import path from "path";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


const PORT = 3000;

console.log(process.env.JWT_SECRET)

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre",genreRoutes)
app.use("/api/v1/movies",moviesRoutes)
app.use("/api/v1/uploads",uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname + '/uploads')))

app.listen(PORT, () => {});
