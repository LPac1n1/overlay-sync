import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Canvas from "./components/overlay/Canvas.jsx";
import Drop from "./components/overlay/Drop.jsx";
import Player from "./components/overlay/Player.jsx";

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
          path="/overlay"
          element={
            <div className="w-screen h-screen relative flex items-center bg-zinc-800">
              <Canvas />
              <Drop />
              <Player />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
