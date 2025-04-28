import { useRef, useState, useContext } from "react";
import { ImagesContext } from "../../../../context/ImagesContext";

import useSocketConnection from "./hooks/useSocketConnection";
import useSocketReceiveImages from "./hooks/useSocketReceiveImages";
import useSocketSendImages from "./hooks/useSocketSendImages";
import useImagesOverPlayer from "./hooks/useImagesOverPlayer";
import useHlsPlayer from "./hooks/useHlsPlayer";

function Player({ streamKey }) {
  const { images } = useContext(ImagesContext);
  const [receivedImages, setReceivedImages] = useState([]);
  const [imagesOverPlayer, setImagesOverPlayer] = useState(new Set());
  const [isStreamReady, setIsStreamReady] = useState(false);

  const socketRef = useRef(null);
  const playerRef = useRef(null);
  const videoRef = useRef(null);

  useSocketConnection({ socketRef });
  useSocketReceiveImages({ socketRef, setReceivedImages });
  useSocketSendImages({ socketRef, playerRef, imagesOverPlayer });
  useImagesOverPlayer({ playerRef, images, setImagesOverPlayer });
  useHlsPlayer({ videoRef, streamKey, setIsStreamReady });

  return (
    <div
      ref={playerRef}
      className="w-full max-w-[960px] aspect-[16/9] flex justify-center items-center mx-32 bg-zinc-900 z-10"
    >
      {receivedImages.map((receivedImage) => (
        <img
          key={receivedImage.id}
          src={receivedImage.url}
          width={receivedImage.dimensions.width}
          height={receivedImage.dimensions.height}
          style={{
            position: "absolute",
            left: receivedImage.position.x,
            top: receivedImage.position.y,
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      ))}

      <video
        ref={videoRef}
        autoPlay
        muted
        className={`w-full h-full transition-opacity duration-300 ${
          isStreamReady ? "opacity-100" : "opacity-0"
        }`}
      />

      {!isStreamReady && (
        <div className="absolute text-zinc-400">Stream offline.</div>
      )}
    </div>
  );
}

export default Player;
