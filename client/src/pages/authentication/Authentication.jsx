// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// import verifyToken from "../../services/api/verifyToken.js";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Swap from "./components/Swap.jsx";

function Authentication() {
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const isLogged = await verifyToken();
  //       isLogged ? navigate("/panel") : setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       navigate("/authentication");
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);

  // if (loading) return null;

  return (
    <div className="w-screen h-screen bg-zinc-800">
      <motion.div
        className="w-full h-full relative flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Login />
        <Register />
        <Swap />
      </motion.div>
    </div>
  );
}

export default Authentication;
