import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ImagesProvider } from "../../context/ImagesContext.jsx";

import verifyToken from "../../services/api/verifyToken.js";
import getOverlayCanvas from "../../services/api/getOverlayCanvas.js";

import Layout from "../../layout/Layout";
import LoadingPage from "../../layout/LoadingPage";
import NotFound from "../../pages/others/NotFound";
import AccessDenied from "../../pages/others/AccessDenied";

import Buttons from "./components/buttons/Buttons.jsx";
import Toolbar from "./components/toolbar/Toolbar.jsx";
import Editor from "./components/editor/Editor.jsx";
import Workspace from "./components/workspace/Workspace.jsx";

function Canvas() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [canvas, setCanvas] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const checkAuthAndLoadCanvas = async () => {
      const isAuthenticated = await verifyToken();
      if (!isAuthenticated) return navigate("/authentication");

      const route = window.location.pathname.split("/").pop();

      try {
        const canvas = await getOverlayCanvas(route);
        setCanvas(canvas);
      } catch (error) {
        const { message } = JSON.parse(error.message);
        if (message.includes("not found")) return setNotFound(true);
        if (message.includes("access denied")) return setAccessDenied(true);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndLoadCanvas();
  }, [navigate]);

  if (notFound) return <NotFound />;
  if (accessDenied) return <AccessDenied />;
  if (loading) return <LoadingPage />;

  return (
    <Layout isLoading={loading} classes={"relative h-full"}>
      <ImagesProvider>
        <Buttons canvas={canvas} />
        <Toolbar />
        <Editor />
        <Workspace canvas={canvas} />
      </ImagesProvider>
    </Layout>
  );
}

export default Canvas;
