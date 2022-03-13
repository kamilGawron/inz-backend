const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const port = 8080;

const server = http.createServer(app);

mongoose
  .connect(
    "mongodb+srv://admin:A3yl7kzeCuhVk8BU@cluster0.xqu2b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((result) => {
    server.listen(port);
  })
  .catch((err) => console.log(err));
