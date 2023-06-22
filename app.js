const express = require("express");
const fs = require("fs");
const path = require("path"); // joins the path of the current and the video
const mongoose = require("mongoose"); //connection string is different if we use the onpremise. and same as we arer using atlas
const app = express();
const port = 3000;

const productsRouter = require("./routes/products");

//mongoose connection 
mongoose.connect("mongodb+srv://yashvi-hg:bajajfin2002@cluster0.kvvwuap.mongodb.net/productsdb?retryWrites=true&w=majority");

//mongoose.connection.once, passes an even, and on succes without errors it allows the conection. 
mongoose.connection.once("open", () => {
  console.log("Connected to database !");
})


// built-in middleware
app.use(express.static("static"));
app.use(express.json());
app.use("/products", productsRouter);
app.get("/", (req, res) => {
  res.sendFile("Index.html", { root: __dirname });
});

//we write this here since there is only one endpoint. - if there are multiple endpoints, we can put these in the routes file.
app.get("/video", (req, res) => {
  const range = req.headers.range; //
  console.log(range);
  // const videoPath = __dirname + "/videos";
  //console.log(videoPath);
  const videoPath = path.join(__dirname, "videos/video.mp4");
  const videoSize = fs.statSync(videoPath).size;
  //RANGE. -->
  const CHUNK_SIZE = 10 ** 6; //1MB - exponents
  const start = Number(range.replace(/\D/g, "")); // regex. /D - digit.
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  // console.log(videoPath);

  //HEADERS -->
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": end - start + 1,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers); //206 specifies partial content
  //read the file and send the content.
  const videoStream = fs.createReadStream(videoPath, { start, end }); // we can leave it at (videoPath) but we add the start and end to get chunk size.
  // streams are event emitters.
  videoStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
