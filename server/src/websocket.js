const WebSocketHandler = (io) => {
  const clients = new Set();

  io.on("connection", (socket) => {
    console.log("🔌 Cliente conectado:", socket.id);

    const client = { id: socket.id, type: null, socket };
    clients.add(client);

    socket.on("register", (type) => {
      client.type = type;
    });

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log("🔌 Cliente conectado à sala:", room);
    });

    socket.on("message", ({ room, content }) => {
      try {
        if (client.type === "user") {
          for (const c of clients) {
            if (c.socket.id !== client.id && c.socket.rooms.has(room)) {
              c.socket.emit("message", content);
            }
          }
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
