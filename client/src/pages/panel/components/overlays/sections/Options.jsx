import JoinOverlayWidget from "../widgets/JoinOverlayWidget";
import CreateOverlayWidget from "../widgets/CreateOverlayWidget";

function Options() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-8">
        <JoinOverlayWidget />
        <CreateOverlayWidget />
      </div>
    </div>
  );
}

export default Options;
