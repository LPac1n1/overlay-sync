import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { LinkIcon, ArrowLeftIcon } from "lucide-react";

function Buttons({ canvas }) {
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const copyToClipboard = () => {
      navigator.clipboard.writeText(
        `http://localhost:5173/overlay/${canvas.canvas_route}`
      );
    };

    button.addEventListener("click", copyToClipboard);
    return () => button.removeEventListener("click", copyToClipboard);
  }, [canvas]);

  return (
    <div className="absolute right-8 top-8 flex gap-4">
      <button
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => event.preventDefault()}
        ref={buttonRef}
        className="bg-zinc-900 rounded-full p-4 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
      >
        <LinkIcon className="text-zinc-300 z-40 pointer-events-none" />
      </button>

      <button
        onClick={() => navigate("/panel")}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => event.preventDefault()}
        className="bg-zinc-900 rounded-full p-4 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
      >
        <ArrowLeftIcon className="text-zinc-300 z-40 pointer-events-none" />
      </button>
    </div>
  );
}

export default Buttons;
