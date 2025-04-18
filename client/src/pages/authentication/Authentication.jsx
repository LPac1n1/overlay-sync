import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import verifyToken from "../../services/api/verifyToken.js";

import Layout from "../../layout/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import Swap from "./components/Swap";

function Authentication() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await verifyToken();
      isAuthenticated ? navigate("/panel") : setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  return (
    <Layout
      isLoading={loading}
      classes={"h-full flex justify-center items-center"}
    >
      <Login />
      <Register />
      <Swap />
    </Layout>
  );
}

export default Authentication;
