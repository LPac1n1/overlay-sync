import { useRef, useEffect, useCallback } from "react";

function Drop() {
  const dropAlertRef = useRef(null);

  const showDropAlert = useCallback(() => {
    if (!dropAlertRef.current) return;

    dropAlertRef.current.classList.replace("hidden", "flex");

    setTimeout(() => {
      if (dropAlertRef.current) {
        dropAlertRef.current.classList.replace("opacity-0", "opacity-100");
      }
    }, 10);
  }, []);

  const hideDropAlert = useCallback(() => {
    if (!dropAlertRef.current) return;

    dropAlertRef.current.classList.replace("opacity-100", "opacity-0");

    setTimeout(() => {
      if (dropAlertRef.current) {
        dropAlertRef.current.classList.replace("flex", "hidden");
      }
    }, 300);
  }, []);

  useEffect(() => {
    document.addEventListener("dragenter", showDropAlert);
    document.addEventListener("drop", hideDropAlert);

    return () => {
      document.removeEventListener("dragenter", showDropAlert);
      document.removeEventListener("drop", hideDropAlert);
    };
  }, [showDropAlert, hideDropAlert]);

  return (
    <div id="drop-area" className="w-1/3 h-full p-6 bg-zinc-900 relative">
      <div
        ref={dropAlertRef}
        className={`
          hidden 
          opacity-0 
          transition-opacity 
          duration-300 
          w-full 
          h-full 
          justify-center 
          items-center 
          rounded-lg 
          pointer-events-none 
          bg-zinc-800
          `}
      >
        <div className="text-zinc-400 text-lg">Solte aqui</div>
      </div>
    </div>
  );
}

export default Drop;
