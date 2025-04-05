import { v4 as uuid } from "uuid";

function socketHandler(io) {
  const clients = new Set();

  io.on("connection", (socket) => {
    console.log("Cliente conectado!");
    const client = { id: uuid(), socket };

    socket.on("message", (message) => {
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

    socket.on("close", () => {
      clients.forEach((client) => {
        if (client.ws === socket) {
          clients.delete(client);
          console.log("Cliente desconectado:", client.type);
        }
      });
    });
  });
}

export default socketHandler;
