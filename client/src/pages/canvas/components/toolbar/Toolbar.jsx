import { useState } from "react";

import SelectionTool from "./tools/Selection.jsx";
import TextTool from "./tools/Text.jsx";
import PencilTool from "./tools/Pencil.jsx";
import ShowForStream from "./tools/showForStream.jsx";

function Toolbar() {
  const [selectedTool, setSelectedTool] = useState("selection");
  const [showForStream, setShowForStream] = useState(true);

  const selectTool = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <div className="absolute top-8 w-full flex justify-center">
      <div className="bg-zinc-900 flex gap-2 p-2 rounded-2xl z-50">
        <SelectionTool
          selected={selectedTool === "selection"}
          selectTool={selectTool}
        />
        <TextTool selected={selectedTool === "text"} selectTool={selectTool} />
        <PencilTool
          selected={selectedTool === "pencil"}
          selectTool={selectTool}
        />
        <div className="w-4 h-full bg-zinc-800 rounded-full" />
        <ShowForStream show={showForStream} setShow={setShowForStream} />
      </div>
    </div>
  );
}

export default Toolbar;
