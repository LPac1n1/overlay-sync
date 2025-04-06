import httpServer from "./app.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
  console.log(`Servidor rodando com API + WebSocket na porta ${PORT}`)
);
