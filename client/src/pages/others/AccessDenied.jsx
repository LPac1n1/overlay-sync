import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-zinc-800">
      <motion.div
        className="w-full h-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl text-zinc-400">Erro 403</h2>
            <h1 className="text-8xl text-center font-semibold leading-tight text-zinc-300">
              Acesso negado!
            </h1>
          </div>

          <div>
            <button
              onClick={() => navigate("/")}
              className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700"
            >
              Página inicial
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;
