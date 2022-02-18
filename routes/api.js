const express = require('express');
const routes = express.Router();
const games = require("../models/game");

routes.get("/", (req, res) => {
  res.render("api");
})

routes.get("/games", async (req, res) => {
  // let doc = await games.findOne();
  // await games.deleteOne({ _id: doc._id });
  // Create NEW GAME
  // let newGame = new games({
  //   name: "Valorant",
  //   genre: "FIrst-Person shooter",
  //   developer: "Riot Games",
  //   publisher: "Riot Games",
  //   description: "Valorant is a free-to-play first-person hero shooter developed and published by Riot Games, for Microsoft Windows. First teased under the codename Project A in October 2019, the game began a closed beta period with limited access on April 7, 2020, followed by an official release on June 2, 2020.",
  //   platform: "Microsoft Windows",
  //   image: "https://i0.wp.com/funglr.games/wp-content/uploads/2020/05/riot-games-valorant-release-00.jpg?resize=1200,630",
  //   releaseYear: 2020
  // });
  // newGame = await newGame.save();

  try {
    let foundGames = await games.find();
    res.send(foundGames);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});

routes.get("/games/:gameId", async (req, res) => {
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
      res.send(foundGame);
    });
})

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
      res.send("true");
    }else{
      res.send("false");
    }
  } catch (err) {
    console.log(err);
    res.send("false");
  }
})

routes.put("/games/:gameId", async (req, res) => {
  const opt = {
    new:true
  }
  games.findByIdAndUpdate({ _id: req.params.gameId }, req.body,opt, function (err, game) {
    if (err) {
      res.send("false");
    }
    else res.send(req.body);
  })
})

routes.delete("/games/:gameId", async (req, res) => {
  games.findByIdAndRemove(req.params.gameId, (err) => {
    if (err) {
      res.send("false");
    } else {
      res.redirect("/api/games");
    }
  })
})

module.exports = routes;
