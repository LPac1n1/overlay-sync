import BackButton from "./backButton";
import StreamKeyButton from "./streamKeyButton";
import OverlayLinkButton from "./overlayLinkButton";
import SettingsButton from "./SettingsButton";

function Buttons({ canvas }) {
  return (
    <>
      <div className="absolute left-8 top-8 z-50">
        <BackButton />
      </div>
      <div className="absolute right-8 top-8 space-x-4 z-50">
        <StreamKeyButton streamKey={canvas.stream_key} />
        <OverlayLinkButton canvasRoute={canvas.canvas_route} />
        <SettingsButton canvas={canvas} />
      </div>
    </>
  );
}

export default Buttons;
