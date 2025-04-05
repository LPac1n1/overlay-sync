import { WebSocketServer } from "ws";
import { v4 as uuid } from "uuid";

const wss = new WebSocketServer({ port: 8080 });

const clients = new Set();

wss.on("connection", (ws) => {
  console.log("Cliente conectado!");
  const client = { id: uuid(), ws };

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "user") {
      client.type = "user";
      if (!clients.has(client)) {
        clients.add(client);
      }

      console.log("Recebi do usuário:", data);

      clients.forEach((client) => {
        if (client.type === "overlay") {
          client.ws.send(JSON.stringify(data));
        }
      });
    }

    if (data.type === "overlay") {
      client.type = "overlay";
      if (!clients.has(client)) {
        clients.add(client);
      }
    }
  });

  ws.on("close", () => {
    clients.forEach((client) => {
      if (client.ws === ws) {
        clients.delete(client);
        console.log("Cliente desconectado:", client.type);
      }
    });
  });
});

console.log("Servidor WebSocket rodando na porta 8080.");
