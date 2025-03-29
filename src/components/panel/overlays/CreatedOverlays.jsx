import TwitchOverlayWidget from "../widgets/TwitchOverlayWidget";
import YoutubeOverlayWidget from "../widgets/YoutubeOverlayWidget";

function CreatedOverlays() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-lg text-zinc-500">Overlays recentes</p>
      </div>

      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-8">
        <TwitchOverlayWidget />
        <YoutubeOverlayWidget />
      </div>
    </div>
  );
}

export default CreatedOverlays;
