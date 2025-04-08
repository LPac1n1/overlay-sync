import { motion } from "framer-motion";

import PanelNavbar from "./components/navbar/PanelNavbar.jsx";
import Overlays from "./components/overlays/Overlays.jsx";

function Panel() {
  return (
    <div className="w-screen h-screen bg-zinc-800 px-8 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-8"></div>
        <PanelNavbar />
        <Overlays />
      </motion.div>
    </div>
  );
}

export default Panel;
