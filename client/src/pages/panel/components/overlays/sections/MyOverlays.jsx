import { useEffect, useState } from "react";

import getOverlays from "../../../../../services/api/getOverlays.js";

import OverlayWidget from "../widgets/OverlayWidget";

function MyOverlays({ reloadOverlays }) {
  const [createdOverlays, setCreatedOverlays] = useState([]);
  const [invitedOverlays, setInvitedOverlays] = useState([]);

  const getUserOvelays = async () => {
    const overlays = await getOverlays();

    setCreatedOverlays(overlays.createdOverlays);
    setInvitedOverlays(overlays.invitedOverlays);
  };

  useEffect(() => {
    getUserOvelays();
  }, [reloadOverlays]);

  return (
    <div className="flex flex-col gap-8">
      {createdOverlays.length > 0 && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg text-zinc-500">Minhas overlays</p>
          </div>

          <div className="h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-8">
            {createdOverlays.map((overlay) => {
              return (
                <OverlayWidget
                  key={overlay.id}
                  overlay={overlay}
                  overlayRole={"creator"}
                  onOverlaysChange={getUserOvelays}
                />
              );
            })}
          </div>
        </div>
      )}

      {invitedOverlays.length > 0 && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg text-zinc-500">Overlays que faço parte</p>
          </div>

          <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-8">
            {invitedOverlays.map((overlay) => {
              return (
                <OverlayWidget
                  key={overlay.overlay.id}
                  overlay={overlay.overlay}
                  overlayRole={overlay.role}
                  onOverlaysChange={getUserOvelays}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyOverlays;
