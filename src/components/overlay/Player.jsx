import { useRef, useState, useEffect, useContext } from "react";

import { getStreamData } from "../../api/Twitch";
import { ImagesContext } from "../../context/Images";

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

  // Image in front player area handler
  const { images } = useContext(ImagesContext);

  useEffect(() => {
    const imagesDOM = images.map((image) => image.html.current);
    imagesDOM.forEach((imageDOM) => {
      const playerRect = iframeRef.current.getBoundingClientRect();
      const imageRect = imageDOM.getBoundingClientRect();

      const isOnPlayerArea = (elementRect) => {
        if (
          elementRect.bottom >= playerRect.top &&
          elementRect.right >= playerRect.left &&
          elementRect.top <= playerRect.bottom &&
          elementRect.left <= playerRect.right
        )
          return true;
        return false;
      };

      if (!isOnPlayerArea(imageRect)) return;

      console.log("Está em cima!");
    });
  }, [images]);

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
