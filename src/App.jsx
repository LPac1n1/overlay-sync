import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Link from "./components/overlay/Link.jsx";
import Canvas from "./components/overlay/Canvas.jsx";
import Drop from "./components/overlay/Drop.jsx";
import Player from "./components/overlay/Player.jsx";
import Overlay from "./components/overlay/Overlay.jsx";

import { ImagesProvider } from "./context/Images.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={<div className="w-screen h-screen bg-zinc-800"></div>}
        />

        <Route
          path="/dashboard"
          element={<div className="w-screen h-screen bg-zinc-800"></div>}
        />

        <Route
          path="/canvas"
          element={
            <div className="w-screen h-screen relative flex items-center bg-zinc-800">
              <ImagesProvider>
                <Link />
                <Canvas />
                <Drop />
                <Player />
              </ImagesProvider>
            </div>
          }
        />

        <Route path="/overlay" element={<Overlay />} />
      </Routes>
    </Router>
  );
}

export default App;
