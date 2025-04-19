import { motion } from "framer-motion";

function AppearanceSection() {
  return (
    <motion.section
      key={"appearence"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full"
    >
      <div className="w-full h-full flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="text-3xl">Aparência</h3>
          <span className="block w-full h-[0.1rem] bg-zinc-700/50"></span>
        </div>
      </div>
    </motion.section>
  );
}

export default AppearanceSection;
