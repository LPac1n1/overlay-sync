const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID;
const ACCESS_TOKEN = import.meta.env.VITE_TWICH_ACCESS_TOKEN;

const getStreamData = async (streamerUser) => {
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
    return streamData.data[0];
  } catch (error) {
    console.error(`Erro ao buscar stream: ${error.message}`);
  }
};

export { getStreamData };
