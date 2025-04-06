import express from "express";
import cors from "cors";
import router from "./api/routes.js";

import { createServer } from "http";
import { Server } from "socket.io";

import WebSocketHandler from "./websocket.js";

const app = express();
const httpServer = createServer(app);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

const io = new Server(httpServer, {
  cors: corsOptions,
});

WebSocketHandler(io);

export default httpServer;
