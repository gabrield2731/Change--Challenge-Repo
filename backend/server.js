const csv = require("csvtojson");
const path = require("path");
const cors = require("cors");
const csvFilePath = path.join(__dirname, "taylor_swift_lyrics.csv");
const express = require("express");
const app = express();

const csvToJson = async () => {
  const songsArray = await csv().fromFile(csvFilePath);

  var song = songsArray[Math.floor(Math.random() * 4864)];

  return song;
};

app.use(cors());

app.get("/", async (req, res) => {
  var song = await csvToJson();

  console.log(song);
  res.send(song);
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
