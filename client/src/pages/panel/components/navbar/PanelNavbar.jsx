import { BringToFrontIcon, UserRoundIcon } from "lucide-react";

function PanelNavbar() {
  return (
    <div className="max-w-7xl h-auto flex justify-between items-center gap-4 mx-auto">
      <div className="w-12 h-12 flex justify-start items-center">
        <BringToFrontIcon className="w-full h-full text-zinc-200 stroke-1" />
      </div>
      <div className=" bg-zinc-900 rounded-full p-3 hover:cursor-pointer">
        <UserRoundIcon className="text-zinc-400 pointer events-none" />
      </div>
    </div>
  );
}

export default PanelNavbar;
