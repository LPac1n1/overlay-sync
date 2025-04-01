import { ImagesProvider } from "../../context/ImagesContext.jsx";

import Buttons from "./components/buttons/Buttons.jsx";
import Toolbar from "./components/toolbar/Toolbar.jsx";
import Editor from "./components/editor/Editor.jsx";
import Drop from "./components/drop/Drop.jsx";
import Workspace from "./components/workspace/Workspace.jsx";

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
