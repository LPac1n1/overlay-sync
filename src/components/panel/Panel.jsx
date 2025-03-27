import PanelNavbar from "../panel/PanelNavbar";
import Overlays from "../panel/Overlays";

function Panel() {
  return (
    <div className="w-screen h-screen bg-zinc-800 px-8 overflow-x-hidden">
      <div className="w-full h-8"></div>
      <PanelNavbar />
      <Overlays />
    </div>
  );
}

export default Panel;
