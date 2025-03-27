import { ImagesProvider } from "../../context/Images.jsx";

import Link from "../canvas/Link.jsx";
import Canvas from "..//canvas/Canvas.jsx";
import Drop from "../canvas/Drop.jsx";
import Player from "../canvas/Player.jsx";

function Workspace() {
  return (
    <div className="w-screen h-screen relative flex items-center bg-zinc-800">
      <ImagesProvider>
        <Link />
        <Canvas />
        <Drop />
        <Player />
      </ImagesProvider>
    </div>
  );
}

export default Workspace;
