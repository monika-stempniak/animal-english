const express = require("express");
const app = express();

app.use(express.static(__dirname + "/build"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
