import { useRef, useEffect } from "react";

import { LinkIcon } from "lucide-react";

function OverlayLinkButton({ canvasRoute }) {
  const overlayLinkButtonRef = useRef(null);

  useEffect(() => {
    const overlayLinkButton = overlayLinkButtonRef.current;

    const copyToClipboard = (content) => {
      navigator.clipboard.writeText(content);
    };

    const handleOverlayLinkClick = () => {
      copyToClipboard(`http://localhost:5173/overlay/${canvasRoute}`);
    };

    overlayLinkButton.addEventListener("click", handleOverlayLinkClick);

    return () => {
      overlayLinkButton.removeEventListener("click", handleOverlayLinkClick);
    };
  }, [canvasRoute]);

  return (
    <button
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => event.preventDefault()}
      ref={overlayLinkButtonRef}
      className="bg-zinc-900 rounded-full p-4 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
    >
      <LinkIcon className="text-zinc-300 z-40 pointer-events-none" />
    </button>
  );
}

export default OverlayLinkButton;
