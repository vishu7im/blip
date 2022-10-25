import Cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import router from "./router/app.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const DB = process.env.MONGODB;

const server = http.createServer(app);

app.use(Cors());
app.use(express.json());
app.use(router);

mongoose.connect(DB).then(() => {
  server.listen(5000, () => {
    console.log("connect ");
  });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {});
