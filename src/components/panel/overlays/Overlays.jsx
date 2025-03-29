import AddOverlay from "./AddOverlay";
import CreatedOverlays from "./CreatedOverlays";

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

      <div className="flex flex-col gap-8">
        <AddOverlay />
        <CreatedOverlays />
      </div>
    </div>
  );
}

export default PanelOverlays;
