import { useEffect, useRef } from "react";

import { LinkIcon } from "lucide-react";

function Link() {
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
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => event.preventDefault()}
      ref={buttonRef}
      className="absolute right-20 -translate-x-3 top-8 bg-zinc-900 rounded-full p-3 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
    >
      <LinkIcon className="text-zinc-300 z-40 pointer-events-none" />
    </button>
  );
}

export default Link;
