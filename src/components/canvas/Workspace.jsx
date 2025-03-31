import { ImagesProvider } from "../../context/Images.jsx";

import Leave from "./buttons/Leave.jsx";
import Link from "./buttons/Link.jsx";
import Canvas from "./sections/Canvas.jsx";
import Drop from "./sections/Drop.jsx";
import Player from "./sections/Player.jsx";

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
