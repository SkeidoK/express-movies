require("dotenv").config();
const express = require("express");
const { hashPassword, verifyPassword } = require("./auth");

const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
app.post(
  "/app/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovies);
app.put("/api/movies", movieHandlers.updateMovie);
app.delete("/app/movies", movieHandlers.deleteMovie);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", hashPassword, userHandlers.postUsers);
app.put("/api/users", userHandlers.updateUser);
app.delete("/app/delete", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
