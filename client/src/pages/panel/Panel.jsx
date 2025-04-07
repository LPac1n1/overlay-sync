import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import PanelNavbar from "./components/navbar/PanelNavbar.jsx";
import Overlays from "./components/overlays/Overlays.jsx";

function Panel() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId === null) navigate("/authentication");
    setUser(userId);
  }, [userId, navigate]);

  return (
    <div className="w-screen h-screen bg-zinc-800 px-8 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-8"></div>
        <PanelNavbar user={user} />
        <Overlays user={user} />
      </motion.div>
    </div>
  );
}

export default Panel;
