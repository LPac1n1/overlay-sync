import Canvas from "./components/Canvas.jsx";
import DropArea from "./components/DropArea.jsx";
import Player from "./components/Player.jsx";

import { useState, useEffect } from "react";

function App() {
  const clientID = import.meta.env.VITE_TWITCH_CLIENT_ID;
  const accessToken = import.meta.env.VITE_TWICH_ACCESS_TOKEN;

  const streamerUser = "alanzoka";

  const [streamerData, setStreamerData] = useState(null);

  useEffect(() => {
    console.log(clientID, accessToken);

    const getStreamerData = async (streamerUser, clientID, accessToken) => {
      try {
        const response = await fetch(
          `https://api.twitch.tv/helix/streams?user_login=${streamerUser}`,
          {
            method: "GET",
            headers: {
              "Client-ID": clientID,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();

        if (data.data.length === 0) return null;

        return data.data[0];
      } catch (error) {
        console.error("Erro ao buscar stream:", error);
        return null;
      }
    };

    return () => [
      getStreamerData(streamerUser, clientID, accessToken).then(
        (streamData) => {
          console.log(streamData);
          setStreamerData(streamData);
        }
      ),
    ];
  }, [clientID, accessToken]);

  return (
    <div className="w-screen h-screen relative flex justify-between items-center bg-zinc-200">
      <Canvas />
      <DropArea />
      <Player streamerData={streamerData} />
    </div>
  );
}

export default App;
