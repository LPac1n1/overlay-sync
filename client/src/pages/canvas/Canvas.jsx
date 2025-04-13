import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ImagesProvider } from "../../context/ImagesContext.jsx";

import { motion } from "framer-motion";

import verifyToken from "../../services/api/verifyToken.js";
import getOverlayCanvas from "../../services/api/getOverlayCanvas.js";

import NotFound from "../../pages/others/NotFound";
import AccessDenied from "../../pages/others/AccessDenied";

import Buttons from "./components/buttons/Buttons.jsx";
// import Toolbar from "./components/toolbar/Toolbar.jsx";
import Editor from "./components/editor/Editor.jsx";
import Drop from "./components/drop/Drop.jsx";
import Workspace from "./components/workspace/Workspace.jsx";

function Canvas() {
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

  const [canvas, setCanvas] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const route = window.location.pathname.split("/").pop();

    const getCanvas = async () => {
      try {
        const canvas = await getOverlayCanvas(route);
        setCanvas(canvas);
      } catch (error) {
        const { message } = JSON.parse(error.message);

        if (message.includes("not found")) {
          return setNotFound(true);
        }

        if (message.includes("access denied")) {
          return setAccessDenied(true);
        }
      }
    };

    getCanvas();
  }, []);

  if (loading) return <div className="w-screen h-screen bg-zinc-800" />;
  if (notFound) return <NotFound />;
  if (accessDenied) return <AccessDenied />;
  if (!canvas) return null;

  return (
    <div className="w-screen h-screen bg-zinc-800 overflow-hidden">
      <motion.div
        className="w-full h-full relative flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <ImagesProvider>
          <Buttons canvas={canvas} />
          {/* <Toolbar /> */}
          <Editor />
          <Drop />
          <Workspace canvas={canvas} />
        </ImagesProvider>
      </motion.div>
    </div>
  );
}

export default Canvas;
