import { BringToFrontIcon, RefreshCwIcon } from "lucide-react";

function PanelNavbar() {
  return (
    <div className="max-w-7xl h-auto flex justify-between items-center mx-auto">
      <div className="relative w-12 h-12 flex justify-start items-center">
        <BringToFrontIcon className="absolute w-10 h-10 text-zinc-200 stroke-1" />
        <RefreshCwIcon className="absolute w-8 h-8 left-1 text-zinc-200 stroke-[1.3] rotate-90" />
      </div>
      <div className="w-12 h-12 bg-zinc-900 rounded-full hover:cursor-pointer"></div>
    </div>
  );
}

export default PanelNavbar;
