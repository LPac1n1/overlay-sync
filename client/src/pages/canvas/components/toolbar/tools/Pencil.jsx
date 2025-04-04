import { PencilIcon } from "lucide-react";

function PencilTool() {
  return (
    <div className="w-full h-full rounded-lg p-2 transition-all r z-50">
      <PencilIcon className="text-zinc-600 z-40 pointer-events-none" />
    </div>
  );
}

export default PencilTool;
