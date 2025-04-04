self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service Worker ativado!");
  connectWebSocket();
});

function connectWebSocket() {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onclose = () => {
    setTimeout(connectWebSocket, 5000);
  };
  ws.onerror = (error) => console.error("Erro no WebSocket:", error);
}
