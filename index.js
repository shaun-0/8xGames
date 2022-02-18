const express = require('express');
const app = express();
const mongoose = require('mongoose');
const APIroutes = require('./routes/api');
const homeRoutes = require('./routes/home');
const games = require('./models/game');
const methodOverride = require("method-override");

const PORT = process.env.PORT || 4000;
const mongodbString = process.env.DBURL;  //mongo atlas database url

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"))   //methodOverride for put and delete requests

//Connect to DB
mongoose.connect(mongodbString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecter to db"))
  .catch((err) => console.log(err));


app.use('/', homeRoutes);
app.use('/api', APIroutes);


app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);

})
