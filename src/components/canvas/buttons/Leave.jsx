import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeftIcon } from "lucide-react";

function Leave() {
  const navigate = useNavigate();

  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const copyToClipboard = () => {
      navigator.clipboard.writeText("http://localhost:5173/overlay/");
    };

    button.addEventListener("click", copyToClipboard);
    return () => button.removeEventListener("click", copyToClipboard);
  }, []);

  return (
    <button
      onClick={() => navigate("/panel")}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => event.preventDefault()}
      ref={buttonRef}
      className="absolute right-8 top-8 bg-zinc-900 rounded-full p-3 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
    >
      <ArrowLeftIcon className="text-zinc-300 z-40 pointer-events-none" />
    </button>
  );
}

export default Leave;
