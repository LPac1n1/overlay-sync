import { ImagesProvider } from "../../context/ImagesContext.jsx";

import { motion } from "framer-motion";

import Buttons from "./components/buttons/Buttons.jsx";
import Toolbar from "./components/toolbar/Toolbar.jsx";
import Editor from "./components/editor/Editor.jsx";
import Drop from "./components/drop/Drop.jsx";
import Workspace from "./components/workspace/Workspace.jsx";

function Canvas() {
  return (
    <div className="w-screen h-screen bg-zinc-800 overflow-hidden">
      <motion.div
        className="w-full h-full relative flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ImagesProvider>
          <Buttons />
          <Toolbar />
          <Editor />
          <Drop />
          <Workspace />
        </ImagesProvider>
      </motion.div>
    </div>
  );
}

export default Canvas;
