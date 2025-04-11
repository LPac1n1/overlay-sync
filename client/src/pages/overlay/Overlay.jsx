import { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

const transformScale = (playerRect, images) => {
  const scaleX = window.innerWidth / playerRect.width;
  const scaleY = window.innerHeight / playerRect.height;

  const transformedImages = [];

  images.forEach((image) => {
    transformedImages.push({
      id: image.id,
      src: image.src,
      x: (image.x - playerRect.x) * scaleX,
      y: (image.y - playerRect.y) * scaleY,
      width: image.width * scaleX,
      height: image.height * scaleY,
      zIndex: image.zIndex,
    });
  });

  return transformedImages;
};

function Overlay() {
  const socketRef = useRef(null);
  const overlayRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      socketRef.current.emit("register", "overlay");
    });

    const route = window.location.pathname.split("/").pop();
    socketRef.current.emit("joinRoom", route);

    socketRef.current.on("message", (data) => {
      setImages(transformScale(data.playerData, data.imagesData));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="relative w-screen h-screen pointer-events-none overflow-hidden"
    >
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          width={img.width}
          height={img.height}
          style={{
            position: "absolute",
            left: img.x,
            top: img.y,
          }}
        ></img>
      ))}
    </div>
  );
}

export default Overlay;
