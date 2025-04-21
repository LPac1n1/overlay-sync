import LoadingPage from "./LoadingPage";

import { motion } from "framer-motion";

function Layout({ isLoading = false, classes, children }) {
  if (isLoading) return <LoadingPage />;

  return (
    <div className="w-screen h-screen bg-zinc-800 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className={`w-full h-full ${classes}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Layout;
