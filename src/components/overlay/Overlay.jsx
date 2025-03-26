import { useEffect, useRef, useState } from "react";

const ws = new WebSocket("ws://localhost:8080");

function Overlay() {
  const overlayRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "overlay" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setImages(data.data);
    };
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div
      ref={overlayRef}
      className="relative w-screen h-screen pointer-events-none"
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
