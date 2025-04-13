import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => setShow(false), 300);
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const HandleOutClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          id="modal-overlay"
          onClick={HandleOutClick}
          className={`absolute left-0 top-0 w-screen h-screen flex justify-center items-center bg-zinc-900/50 backdrop-blur-sm z-50 overflow-hidden`}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            ref={modalRef}
            className={`w-1/4 bg-zinc-800 rounded-2xl p-8`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
