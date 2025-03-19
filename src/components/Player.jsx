function Player({ streamerData }) {
  return (
    <div className="w-full h-full flex justify-center items-center bg-zinc-200">
      <div className="w-full max-w-screen-width h-full max-h-screen-height flex justify-center items-center m-6 bg-zinc-100">
        {streamerData ? (
          <iframe
            src={`https://player.twitch.tv/?channel=${streamerData.user_login}&parent=localhost`}
            className="w-full h-full"
          ></iframe>
        ) : (
          <p>O streamer não está em live!</p>
        )}
      </div>
    </div>
  );
}

export default Player;
