import { useEffect } from "react";

const ws = new WebSocket("ws://localhost:8080");

function Overlay() {
  useEffect(() => {
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "overlay" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };
  }, []);

  return <div></div>;
}

export default Overlay;
