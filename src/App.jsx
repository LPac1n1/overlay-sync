import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home/Home.jsx";
import Authentication from "./components/authentication/Authentication.jsx";
import Panel from "./components/panel/Panel.jsx";
import Canvas from "./components/canvas/Canvas.jsx";
import Overlay from "./components/overlay/Overlay.jsx";
import NotFound from "./components/NotFound.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/overlay" element={<Overlay />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
