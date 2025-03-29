import AddOverlayWidget from "./AddOverlayWidget";
import TwitchOverlayWidget from "./TwitchOverlayWidget";
import YoutubeOverlayWidget from "./YoutubeOverlayWidget";

function PanelOverlays() {
  return (
    <div className="max-w-7xl py-8 mx-auto">
      <div className="w-full flex flex-col gap-4 mb-8">
        <h1 className="text-6xl text-zinc-300">Overlays</h1>
        <p className="text-lg text-zinc-400">
          Adicionar imagens e textos em livestreams da Twitch e Youtube em tempo
          real.
        </p>
      </div>

      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-8">
        <AddOverlayWidget />
        <TwitchOverlayWidget />
        <YoutubeOverlayWidget />
      </div>
    </div>
  );
}

export default PanelOverlays;
