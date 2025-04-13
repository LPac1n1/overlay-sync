import { useState } from "react";

import Options from "./sections/Options";
import MyOverlays from "./sections/MyOverlays";

function PanelOverlays() {
  const [reloadOverlays, setReloadOverlays] = useState(false);

  const handleReloadOverlays = () => {
    setReloadOverlays((prev) => !prev);
  };

  return (
    <div className="max-w-7xl py-8 mx-auto">
      <div className="w-full flex flex-col gap-4 mb-8">
        <h1 className="text-6xl text-zinc-300 font-medium">Overlays</h1>
        <p className="text-lg text-zinc-400">
          Adicionar imagens e textos em livestreams em tempo real.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Options reloadOverlays={handleReloadOverlays} />
        <MyOverlays reloadOverlays={reloadOverlays} />
      </div>
    </div>
  );
}

export default PanelOverlays;
