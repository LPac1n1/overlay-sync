import { useNavigate } from "react-router-dom";

import {
  BringToFrontIcon,
  UserRoundIcon,
  SettingsIcon,
  DoorOpenIcon,
} from "lucide-react";

import logoutUser from "../../../../services/api/logoutUser.js";

import Popover from "../../../../components/Popover.jsx";

function PanelNavbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
  };

  const content = (
    <div className="flex flex-col">
      <button
        onClick={() => navigate("/settings")}
        className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-slate-200/15"
      >
        <SettingsIcon className="w-4 h-4 text-slate-500" /> <p>Configurações</p>
      </button>
      <button
        onClick={logout}
        className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-rose-200/15"
      >
        <DoorOpenIcon className="w-4 h-4 text-rose-500" />
        <p className="text-rose-500">Sair da conta</p>
      </button>
    </div>
  );

  return (
    <nav className="max-w-7xl h-auto flex justify-between items-center gap-4 mx-auto">
      <div className="w-10 h-10 flex justify-start items-center">
        <BringToFrontIcon className="w-full h-full text-zinc-200 stroke-1" />
      </div>
      <div className="relative">
        <Popover content={content} distance="top-14">
          <div className="bg-zinc-900 rounded-full p-3 hover:cursor-pointer">
            <UserRoundIcon className="text-zinc-400 pointer events-none" />
          </div>
        </Popover>
      </div>
    </nav>
  );
}

export default PanelNavbar;
