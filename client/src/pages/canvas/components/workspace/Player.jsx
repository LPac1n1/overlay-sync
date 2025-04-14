import { useRef, useState, useEffect, useContext } from "react";
import { ImagesContext } from "../../../../context/ImagesContext";

import { io } from "socket.io-client";

function Player() {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      socketRef.current.emit("register", "user");
    });

    const route = window.location.pathname.split("/").pop();
    socketRef.current.emit("joinRoom", route);

    socketRef.current.on("message", (data) => {
      const playerData = data.playerData;
      const imagesData = data.imagesData;

      console.log(playerData, imagesData);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const playerRef = useRef();

  const { images } = useContext(ImagesContext);
  const [imagesOverPlayer, setImagesOverPlayer] = useState(new Set());

  useEffect(() => {
    if (!playerRef.current) return;

    const isOverPlayer = (imageRect, playerRect) => {
      return (
        imageRect.bottom >= playerRect.top &&
        imageRect.right >= playerRect.left &&
        imageRect.top <= playerRect.bottom &&
        imageRect.left <= playerRect.right
      );
    };

    const playerRect = playerRef.current.getBoundingClientRect();
    const imagesDOM = images.map((image) => image.html.current);

    setImagesOverPlayer((prev) => {
      const newSet = new Set(prev);
      for (const image of prev) {
        if (!imagesDOM.includes(image)) {
          newSet.delete(image);
        }
      }
      return newSet;
    });

    imagesDOM.forEach((imageDOM) => {
      const imageRect = imageDOM.getBoundingClientRect();

      setImagesOverPlayer((prev) => {
        const newSet = new Set(prev);
        if (isOverPlayer(imageRect, playerRect)) {
          newSet.add(imageDOM);
        } else {
          newSet.delete(imageDOM);
        }
        return newSet;
      });
    });
  }, [images]);

  useEffect(() => {
    const getPlayerData = () => {
      const playerRect = playerRef.current.getBoundingClientRect();
      return {
        x: playerRect.x,
        y: playerRect.y,
        width: playerRect.width,
        height: playerRect.height,
      };
    };
    const playerData = playerRef.current ? getPlayerData() : null;
    const imagesData = Array.from(imagesOverPlayer).map((image) => {
      const rect = image.getBoundingClientRect();
      return {
        id: image.id,
        src: image.src,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        zIndex: image.style.zIndex,
      };
    });

    socketRef.current.emit("message", {
      room: window.location.pathname.split("/").pop(),
      content: { playerData, imagesData },
    });
  }, [imagesOverPlayer]);

  return (
    <div
      ref={playerRef}
      className="w-full max-w-[960px] aspect-[16/9] flex justify-center items-center mx-32 bg-zinc-900 z-10"
    ></div>
  );
}

export default Player;
