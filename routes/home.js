const express = require('express');
const routes = express.Router();
const games = require("../models/game");


routes.get("/", async (req, res) => {
  try {
    let foundGames = await games.find();
    res.render("home", { games: foundGames });
  } catch (err) {
    res.redirect("/");
  }
});

routes.get("/game/add", (req, res) => {
  res.render("newGame");
})
routes.get("/game/:gameId", async (req, res) => {
  await games.findById(req.params.gameId)
    .exec(function (err, foundGame) {
      if (err) {
        console.log(err);
        res.status(404).send("Game with that Id not found");
      }
      if (!foundGame) {
        console.log("Game not found");
        res.status(404).send("Game with that Id not found");
      }
      res.render("game", { game: foundGame });

    });
});

routes.post("/games", async (req, res) => {
  try {
    let year = parseInt(req.body.releaseYear);
    let newGame = new games({
      name: req.body.name,
      genre: req.body.genre,
      developer: req.body.developer,
      publisher: req.body.publisher,
      description: req.body.description,
      platform: req.body.platform,
      image: req.body.image,
      releaseYear: year
    })
    newGame.save();
    if (newGame) {
      console.log("created\n" + newGame);
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
})

routes.get("/game/:gameId/edit", (req, res) => {
  games.findById(req.params.gameId, (err, foundGame) => {
    if (err) {
      res.redirect("/");
    }
    res.render("editGame", { game: foundGame });

  })
});

routes.post("/game/:gameId/edit", async (req, res) => {
  games.findByIdAndUpdate(req.params.gameId, req.body, (err) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log(req.body);
      res.redirect(`/game/${req.params.gameId}`);
    }
  })
});

routes.post("/game/:gameId/delete", async (req, res) => {
  games.findByIdAndRemove(req.params.gameId, (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.redirect("/");
    }
  })
})
module.exports = routes;