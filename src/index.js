process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const express = require("express");
  const crypto = require("crypto");
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("this was fast!");
  });

  app.listen(3000);
}
