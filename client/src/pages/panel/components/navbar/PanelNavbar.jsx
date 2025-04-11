import { BringToFrontIcon, UserRoundIcon } from "lucide-react";

import logoutUser from "../../../../services/api/logoutUser";

function PanelNavbar() {
  const logout = async () => {
    await logoutUser();
  };

  return (
    <div className="max-w-7xl h-auto flex justify-between items-center gap-4 mx-auto">
      <div className="w-10 h-10 flex justify-start items-center">
        <BringToFrontIcon className="w-full h-full text-zinc-200 stroke-1" />
      </div>
      <div
        onClick={() => logout()}
        className=" bg-zinc-900 rounded-full p-3 hover:cursor-pointer"
      >
        <UserRoundIcon className="text-zinc-400 pointer events-none" />
      </div>
    </div>
  );
}

export default PanelNavbar;
