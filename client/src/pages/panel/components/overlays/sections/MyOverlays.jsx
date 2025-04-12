import { useEffect, useState } from "react";

import getOverlays from "../../../../../services/api/getOverlays";

import OverlayWidget from "../widgets/OverlayWidget";

function MyOverlays() {
  const [createdOverlays, setCreatedOverlays] = useState([]);
  const [invitedOverlays, setInvitedOverlays] = useState([]);

  const getUserOvelays = async () => {
    const overlays = await getOverlays();

    setCreatedOverlays(overlays.createdOverlays);
    setInvitedOverlays(overlays.invitedOverlays);
  };

  useEffect(() => {
    getUserOvelays();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {createdOverlays.length > 0 && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg text-zinc-500">Minhas overlays</p>
          </div>

          <div className="h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-8">
            {createdOverlays.map((overlay) => {
              return (
                <OverlayWidget
                  key={overlay.id}
                  overlay={overlay}
                  onOverlayDelete={getUserOvelays}
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
                  key={overlay.id}
                  overlay={overlay}
                  onOverlayDelete={getUserOvelays}
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
