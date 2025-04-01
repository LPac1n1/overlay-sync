import { MousePointerIcon } from "lucide-react";

function SelectionTool() {
  return (
    <div className="w-full h-full hover:bg-zinc-700 rounded-lg p-2 transition-all hover:cursor-pointer z-50">
      <MousePointerIcon className="text-zinc-400" />
    </div>
  );
}

export default SelectionTool;
