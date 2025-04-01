import { TypeIcon } from "lucide-react";

function SelectionTool() {
  return (
    <div className="w-full h-full rounded-lg p-2 transition-all z-50">
      <TypeIcon className="text-zinc-600 z-40 pointer-events-none" />
    </div>
  );
}

export default SelectionTool;
