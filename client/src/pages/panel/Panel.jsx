import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import verifyToken from "../../services/api/verifyToken.js";

import PanelNavbar from "./components/navbar/PanelNavbar.jsx";
import Overlays from "./components/overlays/Overlays.jsx";

function Panel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLogged = await verifyToken();
        isLogged ? setLoading(false) : navigate("/authentication");
      } catch (error) {
        console.error(error);
        navigate("/authentication");
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div className="w-screen h-screen bg-zinc-800" />;

  return (
    <div className="w-screen h-screen bg-zinc-800 px-8 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full h-8"></div>
        <PanelNavbar />
        <Overlays />
      </motion.div>
    </div>
  );
}

export default Panel;
