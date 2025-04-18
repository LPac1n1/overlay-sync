import { motion } from "framer-motion";

import { LoaderCircleIcon } from "lucide-react";

function LoadingPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-zinc-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="animate-pulse"
      >
        <LoaderCircleIcon className="w-24 h-24 text-zinc-900 animate-spin" />
      </motion.div>
    </div>
  );
}

export default LoadingPage;
