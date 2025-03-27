import { TwitchIcon } from "lucide-react";

function TwitchOverlayWidget() {
  return (
    <div className="max-w-full min-h-72 md:max-w-72 bg-zinc-900 rounded-2xl flex flex-col justify-center items-center overflow-hidden">
      <div className="relative w-full h-3/4 bg-zinc-950 flex justify-center items-center rounded-t-2xl z-10 overflow-hidden">
        <img src="" className="absolute opacity-30" />
      </div>

      <div className="relative w-full h-full flex flex-col justify-evenly items-center">
        <div className="absolute -top-24">
          <TwitchIcon className="w-72 h-72 text-zinc-950/25" />
        </div>

        <h3 className="text-3xl text-zinc-300 z-10">Canal</h3>
        <button className="text-zinc-400 bg-zinc-800 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700">
          Ir para o canvas
        </button>
      </div>
    </div>
  );
}

export default TwitchOverlayWidget;
