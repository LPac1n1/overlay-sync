import { useEffect, useRef, useState } from "react";

function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(false);

  const modalOverlayRef = useRef(null);
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

  if (!show) return null;

  return (
    <div
      id="modal-overlay"
      ref={modalOverlayRef}
      onClick={HandleOutClick}
      className={`absolute left-0 top-0 w-screen h-screen flex justify-center items-center bg-zinc-900/50 backdrop-blur-sm z-50 overflow-hidden opacity-0 duration-300 transition-opacity ${
        isOpen
          ? setTimeout(
              () =>
                modalOverlayRef.current.classList.replace(
                  "opacity-0",
                  "opacity-100"
                ),
              50
            )
          : "opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className={`w-1/4 bg-zinc-800 rounded-2xl p-8 scale-95 duration-300 transition-all ${
          isOpen
            ? setTimeout(
                () =>
                  modalRef.current.classList.replace("scale-95", "scale-100"),
                50
              )
            : "scale-95"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
