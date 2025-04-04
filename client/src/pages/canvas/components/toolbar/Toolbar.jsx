import SelectionTool from "./tools/Selection.jsx";
import TextTool from "./tools/Text.jsx";
import PencilTool from "./tools/Pencil.jsx";

function Toolbar() {
  return (
    <div className="absolute top-8 w-full flex justify-center">
      <div className="bg-zinc-900 flex gap-4 p-2 rounded-2xl z-50">
        <SelectionTool />
        <TextTool />
        <PencilTool />
      </div>
    </div>
  );
}

export default Toolbar;
