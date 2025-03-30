import { useRef, useEffect, useCallback } from "react";

import { ChevronLeftIcon } from "lucide-react";

function Drop() {
  const dropAreaRef = useRef(null);
  const dropAreaButtonRef = useRef(null);
  const chevronIconRef = useRef(null);
  const dropAlertRef = useRef(null);

  const showOrHideDropArea = () => {
    const isShown = dropAreaRef.current.classList.contains("w-1/3");

    if (isShown) {
      dropAreaRef.current.classList.replace("w-1/3", "w-0");
      dropAreaRef.current.classList.remove("p-6");
    }
    if (!isShown) {
      dropAreaRef.current.classList.replace("w-0", "w-1/3");
      dropAreaRef.current.classList.add("p-6");
    }
  };

  const spinIcon = () => {
    chevronIconRef.current.classList.toggle("rotate-180");
  };

  const handleDropAreaButtonClick = () => {
    showOrHideDropArea();
    spinIcon();
  };

  const showDropAlert = useCallback(() => {
    if (dropAreaRef.current.classList.contains("w-0") || !dropAlertRef.current)
      return;

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
    <div
      ref={dropAreaRef}
      id="drop-area"
      className="relative w-1/3 h-full bg-zinc-900 p-6 duration-300 ease-in-out"
    >
      <div
        ref={dropAlertRef}
        className={
          "hidden opacity-0 transition-opacity duration-300 w-full h-full justify-center items-center rounded-lg pointer-events-none bg-zinc-800"
        }
      >
        <div className="text-zinc-400 text-lg">Solte aqui</div>
      </div>

      <div className="absolute left-full translate-x-4 top-1/2 -translate-y-1/2 flex justify-center items-center z-40">
        <button
          ref={dropAreaButtonRef}
          onClick={handleDropAreaButtonClick}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => event.preventDefault()}
          className="bg-zinc-900 rounded-full p-3 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
        >
          <ChevronLeftIcon
            ref={chevronIconRef}
            className="text-zinc-300 z-40 pointer-events-none duration-300 ease-in-out"
          />
        </button>
      </div>
    </div>
  );
}

export default Drop;
