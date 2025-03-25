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
      onMouseMove={(event) => (event.target.style.cursor = "pointer")}
      ref={buttonRef}
      className="absolute right-4 top-4 text-white bg-zinc-900 hover:bg-zinc-950 rounded-full p-3 transition-all z-50"
    >
      <LinkIcon className="z-40" />
    </button>
  );
}

export default Link;
