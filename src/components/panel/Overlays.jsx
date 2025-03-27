import AddOverlay from "./AddOverlay";
import TwitchOverlayWidget from "./TwitchOverlayWidget";

function PanelOverlays() {
  return (
    <div className="max-w-7xl py-8 mx-auto">
      <div className="w-full flex flex-col gap-4 mb-8">
        <h1 className="text-6xl text-zinc-300">Overlays</h1>
        <h2 className="text-lg text-zinc-400">
          Adicionar imagens e textos em livetreams da Twitch e Youtube em tempo
          real.
        </h2>
      </div>

      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-8">
        <AddOverlay />
        <TwitchOverlayWidget />
      </div>
    </div>
  );
}

export default PanelOverlays;
