import AddOverlay from "./AddOverlay";
import TwitchOverlayWidget from "./TwitchOverlayWidget";

function PanelOverlays() {
  return (
    <div className="max-w-7xl py-8 mx-auto">
      <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-10">
        <AddOverlay />
        <TwitchOverlayWidget />
      </div>
    </div>
  );
}

export default PanelOverlays;
