import { useNavigate } from "react-router-dom";

import { TwitchIcon } from "lucide-react";

function TwitchOverlayWidget() {
  const navigate = useNavigate();

  return (
    <div className="max-w-full min-h-72 md:max-w-80 bg-zinc-900 border-2 border-zinc-800/50 rounded-2xl flex flex-col justify-center items-center overflow-hidden">
      <div className="relative w-full h-3/4 bg-zinc-950 flex justify-center items-center z-10 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-t from-zinc-900 to-transparent z-10"></div>
        <img src="" className="absolute w-full opacity-50" />
      </div>

      <div className="relative w-full h-full flex flex-col justify-evenly items-center">
        <div className="absolute w-full h-full bg-gradient-to-b from-zinc-900 to-transparent to-90% z-10"></div>

        <div className="absolute -top-10">
          <TwitchIcon className="w-72 h-72 text-purple-800/10" />
        </div>

        <h3 className="text-3xl text-zinc-300 z-10">Canal</h3>
        <button
          onClick={() => navigate("/canvas")}
          className="text-zinc-400 bg-zinc-800 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700"
        >
          Ir para o canvas
        </button>
      </div>
    </div>
  );
}

export default TwitchOverlayWidget;
