import { ImagesProvider } from "../../context/ImagesContext.jsx";

import Buttons from "./sections/buttons/Buttons.jsx";
import Toolbar from "./sections/toolbar/Toolbar.jsx";
import Editor from "./sections/editor/Editor.jsx";
import Drop from "./sections/drop/Drop.jsx";
import Workspace from "./sections/workspace/Workspace.jsx";

function Canvas() {
  return (
    <div className="w-screen h-screen relative flex items-center bg-zinc-800 overflow-hidden">
      <ImagesProvider>
        <Buttons />
        <Toolbar />
        <Editor />
        <Drop />
        <Workspace />
      </ImagesProvider>
    </div>
  );
}

export default Canvas;
