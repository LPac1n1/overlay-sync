import { useNavigate } from "react-router-dom";

// import { UserRoundIcon } from "lucide-react";

function OverlayWidget({ overlay }) {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-full min-h-72 md:max-w-80 bg-zinc-900 border-2 border-zinc-950/25 rounded-2xl flex flex-col justify-center items-center overflow-hidden">
      <div className="relative w-full h-3/4 bg-zinc-950 flex justify-center items-center overflow-hidden z-10">
        <div className="w-full h-full bg-gradient-to-b from-transparent from-10% via-zinc-900/80 to-zinc-900 z-10"></div>
        <img
          src={overlay.channel_picture !== null ? overlay.channel_picture : ""}
          className="absolute w-full opacity-25"
        />
      </div>

      <div className="relative w-full h-1/2 flex justify-center items-center"></div>

      <div className="absolute w-full h-full flex flex-col justify-end items-center gap-8 pb-8 z-10">
        <h3 className="text-3xl text-zinc-300">{overlay.channel_name}</h3>
        <button
          onClick={() => navigate(`/canvas/${overlay.canvas_route}`)}
          className="text-zinc-400 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-zinc-700/50"
        >
          Ir para o canvas
        </button>

        {/* <div className="flex justify-center items-center">
          <div className="w-10 h-10 bg-rose-500 flex justify-center items-center rounded-full overflow-hidden">
            <UserRoundIcon className="w-6 h-6 text-zinc-800" />
          </div>
          <div className="w-10 h-10 bg-blue-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden">
            <UserRoundIcon className="w-6 h-6 text-zinc-800" />
          </div>
          <div className="w-10 h-10 bg-orange-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden">
            <UserRoundIcon className="w-6 h-6 text-zinc-800" />
          </div>
          <div className="w-10 h-10 bg-yellow-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden">
            <UserRoundIcon className="w-6 h-6 text-zinc-800" />
          </div>
          <div className="w-10 h-10 bg-green-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden">
            <UserRoundIcon className="w-6 h-6 text-zinc-800" />
          </div>
          <div className="relative w-10 h-10 flex justify-center items-center rounded-full overflow-hidden">
            <p className="absolute text-2xl text-zinc-300 z-10">+1</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default OverlayWidget;
