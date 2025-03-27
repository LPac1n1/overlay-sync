import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Panel from "./components/panel/Panel.jsx";
import Workspace from "./components/canvas/Workspace.jsx";
import Overlay from "./components/overlay/Overlay.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={<div className="w-screen h-screen bg-zinc-800"></div>}
        />

        <Route path="/panel" element={<Panel />} />
        <Route path="/canvas" element={<Workspace />} />
        <Route path="/overlay" element={<Overlay />} />
      </Routes>
    </Router>
  );
}

export default App;
