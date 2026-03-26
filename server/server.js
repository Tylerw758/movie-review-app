import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/movieapp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/movies", movieRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));