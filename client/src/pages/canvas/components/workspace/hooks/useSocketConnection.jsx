import { useEffect } from "react";
import { io } from "socket.io-client";

function useSocketConnection({ socketRef }) {
  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      socketRef.current.emit("register", "user");
    });

    const route = window.location.pathname.split("/").pop();
    socketRef.current.emit("joinRoom", route);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [socketRef]);
}

export default useSocketConnection;
