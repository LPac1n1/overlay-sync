import { KeyRoundIcon } from "lucide-react";

function JoinOverlayWidget() {
  return (
    <div className="col-span-1">
      <div className="max-w-full min-h-72 md:max-w-80 bg-zinc-900/50 border-2 border-zinc-600/25 rounded-2xl flex justify-center items-center transition-all hover:bg-zinc-900/15 hover:cursor-pointer">
        <div>
          <KeyRoundIcon className="w-10 h-10 text-zinc-600" />
        </div>
      </div>
    </div>
  );
}

export default JoinOverlayWidget;
