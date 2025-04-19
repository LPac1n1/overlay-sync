import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Popover({ children, content, distance }) {
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
        <div className="relative z-20">{children}</div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            ref={popoverRef}
            className={`absolute ${
              distance && distance
            } right-0 text-zinc-300 bg-zinc-900 rounded-lg whitespace-nowrap z-40 overflow-hidden`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Popover;
