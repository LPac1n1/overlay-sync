import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Swap from "./components/Swap.jsx";

const isLogged = localStorage.getItem("userId") ? true : false;

function Authentication() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) navigate("/panel");
  }, [navigate]);

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
