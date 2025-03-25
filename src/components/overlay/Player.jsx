import { useRef, useState, useEffect, useContext } from "react";

import { getStreamData } from "../../api/Twitch";
import { ImagesContext } from "../../context/Images";

const ws = new WebSocket("ws://localhost:8080");

function Player() {
  const iframeRef = useRef(null);

  const streamer = "omeiaum";
  const [streamData, setStreamData] = useState(null);

  // Get stream data
  useEffect(() => {
    const fetchStreamData = async () => {
      const streamData = await getStreamData(streamer);
      setStreamData(streamData);
    };

    fetchStreamData();
  }, []);

  // Image over player area handler
  const { images } = useContext(ImagesContext);
  const [imagesOverPlayer, setImagesOverPlayer] = useState(new Set());

  useEffect(() => {
    if (!iframeRef.current) return;

    const isOverPlayer = (imageRect, playerRect) => {
      return (
        imageRect.bottom >= playerRect.top &&
        imageRect.right >= playerRect.left &&
        imageRect.top <= playerRect.bottom &&
        imageRect.left <= playerRect.right
      );
    };

    const playerRect = iframeRef.current.getBoundingClientRect();
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
    const imagesData = Array.from(imagesOverPlayer).map((image) => {
      const rect = image.getBoundingClientRect();
      return {
        src: image.src,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      };
    });

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "user", data: imagesData }));
    }
  }, [imagesOverPlayer]);

  return (
    <div className="w-full h-full max-w-[960px] max-h-[540px] flex justify-center items-center mx-auto bg-zinc-900">
      {streamData ? (
        <iframe
          ref={iframeRef}
          src={`https://player.twitch.tv/?channel=${streamData.user_login}&parent=localhost`}
          className="w-full h-full"
        ></iframe>
      ) : (
        <div className="text-zinc-400 text-lg">O streamer está offline!</div>
      )}
    </div>
  );
}

export default Player;
