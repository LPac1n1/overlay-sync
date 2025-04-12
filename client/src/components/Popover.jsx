import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Popover({ children, content }) {
  const [open, setOpen] = useState(false);

  const popoverRef = useRef(null);
  const popoverButtonRef = useRef(null);

  const togglePopover = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        popoverButtonRef.current &&
        !popoverButtonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div onClick={togglePopover}>
      <div ref={popoverButtonRef}>
        <div>{children}</div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            ref={popoverRef}
            className="absolute top-10 right-6 max-w-32 text-zinc-300 bg-zinc-800 rounded-lg z-40 overflow-hidden"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Popover;
