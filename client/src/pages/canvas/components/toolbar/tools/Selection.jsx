import { MousePointerIcon } from "lucide-react";

function SelectionTool({ selected, selectTool }) {
  return (
    <div
      onClick={() => selectTool("selection")}
      className={`w-full h-full flex justify-center items-center rounded-lg p-2 transition-all hover:!cursor-pointer z-50 ${
        selected ? "bg-zinc-700" : "hover:bg-zinc-800"
      }`}
    >
      <MousePointerIcon className="text-zinc-400 z-40 pointer-events-none" />
    </div>
  );
}

export default SelectionTool;
