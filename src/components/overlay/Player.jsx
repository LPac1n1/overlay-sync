import { useRef, useState, useEffect } from "react";

function Player() {
  const playerRef = useRef(null);

  const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_TWICH_ACCESS_TOKEN;

  const streamerUser = "omeiaum";

  const [streamData, setStreamData] = useState(null);

  useEffect(() => {
    const getStreamData = async () => {
      try {
        const response = await fetch(
          `https://api.twitch.tv/helix/streams?user_login=${streamerUser}`,
          {
            method: "GET",
            headers: {
              "Client-ID": CLIENT_ID,
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );

        const streamData = await response.json();

        if (streamData.data.length === 0) return;

        setStreamData(streamData.data[0]);
      } catch (error) {
        console.error(`Erro ao buscar stream: ${error.message}`);
      }
    };

    getStreamData();
  }, [CLIENT_ID, ACCESS_TOKEN]);

  return (
    <div className="w-full max-w-screen-width h-full max-h-screen-height flex justify-center items-center mx-auto bg-zinc-900">
      {streamData ? (
        <iframe
          ref={playerRef}
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
