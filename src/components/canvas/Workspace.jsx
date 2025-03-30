import { ImagesProvider } from "../../context/Images.jsx";

import Leave from "./Leave.jsx";
import Link from "./Link.jsx";
import Canvas from "./Canvas.jsx";
import Drop from "./Drop.jsx";
import Player from "./Player.jsx";

function Workspace() {
  return (
    <div className="w-screen h-screen relative flex items-center bg-zinc-800 overflow-hidden">
      <ImagesProvider>
        <Leave />
        <Link />
        <Canvas />
        <Drop />
        <Player />
      </ImagesProvider>
    </div>
  );
}

export default Workspace;
