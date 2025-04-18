import { useEffect, useRef } from "react";

import Player from "./Player";

function Workspace({ canvas }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawPolkaDots = () => {
      const dotRadius = 2.5;
      const spacing = 15;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = "rgba(24,24,27, 0.25)";
      for (let x = 10; x < canvasWidth; x += spacing) {
        for (let y = 0; y < canvasHeight; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawPolkaDots();
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center pointer-events-none">
      <canvas ref={canvasRef} className="absolute left-0 top-0" />
      <Player streamKey={canvas.stream_key} />
    </div>
  );
}

export default Workspace;
