import { useEffect, useState } from "react";

import getOverlays from "../../../../../services/api/getOverlays";

import OverlayWidget from "../widgets/OverlayWidget";

function MyOverlays() {
  const [overlays, setOverlays] = useState([]);

  const getUserOvelays = async () => {
    const overlays = await getOverlays();
    setOverlays(overlays);
  };

  useEffect(() => {
    getUserOvelays();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {overlays.length > 0 && (
        <>
          <div>
            <p className="text-lg text-zinc-500">Minhas overlays</p>
          </div>

          <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-8">
            {overlays.map((overlay) => {
              return (
                <OverlayWidget
                  key={overlay.id}
                  overlay={overlay}
                  onOverlayDelete={getUserOvelays}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default MyOverlays;
