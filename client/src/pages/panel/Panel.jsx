import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import verifyToken from "../../services/api/verifyToken.js";

import Layout from "../../layout/Layout";
import PanelNavbar from "./components/navbar/PanelNavbar";
import Overlays from "./components/overlays/Overlays";
import LoadingPage from "../../layout/LoadingPage";

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

  if (loading) return <LoadingPage />;

  return (
    <Layout isLoading={loading} classes={"p-8"}>
      <PanelNavbar />
      <Overlays />
    </Layout>
  );
}

export default Panel;
