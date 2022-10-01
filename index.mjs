import { createRequire } from "module";
const require = createRequire(import.meta.url);
import createBareServer from "@tomphttp/bare-server-node";
import http from "http";
const { createProxyMiddleware } = require("http-proxy-middleware");

import express from "express";

const httpServer = http.createServer();

const expressServer = express();

expressServer.use(express.static("public"));

expressServer.use(
  "/arc",
  createProxyMiddleware({
    target: "https://arc.io/widget.min.js",
    changeOrigin: true,
    secure: true,
    ws: true,
  })
);

expressServer.get("/", (req, res) => {
  res.sendFile("index.html");
});

const bareServer = createBareServer("/bear/", {
  maintainer: {
    email: "webmaster@goastral.net",
    website: "https://github.com/AstralsService/Lucid",
  },
});

httpServer.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    expressServer(req, res);
  }
});

httpServer.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

httpServer.on("listening", () => {
  console.log("HTTP server listening");
});

httpServer.listen({
  port: 8080,
});
