const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  genre: {
    type: String,

    maxlength: 100
  },
  developer: {
    type: String,

    maxlength: 500,
    default: "Unknown"
  },
  publisher: {
    type: String,

    maxlength: 500,
    default: "Unknown"
  },
  description: {
    type: String,

    maxlength: 1000,
    required: true
  },
  platform: {
    type: String,

    maxlength: 500
  },
  image: {
    type: String

  },
  releaseYear: {
    type: Number,

  }

})
module.exports = mongoose.model("games", gameSchema);



// {
//   "name": "Valorant",
//   "genre": "FIrst-Person shooter",
//   "developer": "Riot Games",
//   "publisher": "Riot Games",
//   "description": "Valorant is a free-to-play first-person hero shooter developed and published by Riot Games, for Microsoft Windows. First teased under the codename Project A in October 2019, the game began a closed beta period with limited access on April 7, 2020, followed by an official release on June 2, 2020.",
//   "platform": "Microsoft Windows",
//   "image": "https://i0.wp.com/funglr.games/wp-content/uploads/2020/05/riot-games-valorant-release-00.jpg?resize=1200,630",
//   "releaseYear":2000
// }
