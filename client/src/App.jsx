import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Authentication from "./pages/authentication/Authentication.jsx";
import Panel from "./pages/panel/Panel.jsx";
import Canvas from "./pages/canvas/Canvas.jsx";
import Overlay from "./pages/overlay/Overlay.jsx";
import NotFound from "./pages/others/NotFound.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/canvas/" element={<Canvas />} />
        <Route path="/overlay/" element={<Overlay />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
