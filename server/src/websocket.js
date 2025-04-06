const WebSocketHandler = (io) => {
  const clients = new Set();

  io.on("connection", (socket) => {
    console.log("🔌 Cliente conectado:", socket.id);

    const client = { id: socket.id, type: null, socket };
    clients.add(client);

    socket.on("message", (data) => {
      try {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;

        if (parsed.type === "user") {
          client.type = "user";

          for (const client of clients) {
            if (client.type === "overlay") {
              client.socket.emit("message", parsed.content);
            }
          }
        }

        if (parsed.type === "overlay") {
          client.type = "overlay";
        }
      } catch (err) {
        console.error("❌ Erro ao processar mensagem:", err);
      }
    });

    socket.on("disconnect", () => {
      clients.delete(client);
      console.log("❌ Cliente desconectado:", client.type);
    });
  });
};

export default WebSocketHandler;
