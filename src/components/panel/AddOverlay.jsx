import { PlusIcon } from "lucide-react";

function AddOverlay() {
  return (
    <div className="max-w-full min-h-72 md:max-w-80 bg-zinc-900 border-2 border-zinc-700/75 rounded-2xl flex justify-center items-center transition-all hover:bg-zinc-700 hover:cursor-pointer">
      <div>
        <PlusIcon className="w-8 h-8 text-zinc-400" />
      </div>
    </div>
  );
}

export default AddOverlay;
