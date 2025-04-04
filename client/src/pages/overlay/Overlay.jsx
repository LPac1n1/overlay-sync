import { useEffect, useRef, useState } from "react";

const ws = new WebSocket("ws://localhost:8080");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./src/utils/service-worker.js")
    .then((reg) => {
      console.log("Service Worker registrado com sucesso!", reg);
    })
    .catch((err) => console.error("Erro ao registrar Service Worker:", err));
}

function Overlay() {
  const overlayRef = useRef(null);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "overlay" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setImages(transformScale(data.data.playerData, data.data.imagesData));
    };
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

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
