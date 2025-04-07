import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Swap from "./components/Swap.jsx";

import { motion } from "framer-motion";

function Authentication() {
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
