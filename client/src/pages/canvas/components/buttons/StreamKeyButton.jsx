import { useRef, useEffect } from "react";

import { KeyRoundIcon } from "lucide-react";

function StreamKeyButton({ streamKey }) {
  const streamKeyButtonRef = useRef(null);

  useEffect(() => {
    const streamKeyButton = streamKeyButtonRef.current;

    const copyToClipboard = (content) => {
      navigator.clipboard.writeText(content);
    };

    const handleStreamKeyClick = () => {
      copyToClipboard(streamKey);
    };

    streamKeyButton.addEventListener("click", handleStreamKeyClick);

    return () => {
      streamKeyButton.removeEventListener("click", handleStreamKeyClick);
    };
  }, [streamKey]);

  return (
    <button
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => event.preventDefault()}
      ref={streamKeyButtonRef}
      className="bg-zinc-900 rounded-full p-4 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
    >
      <KeyRoundIcon className="text-zinc-300 z-40 pointer-events-none" />
    </button>
  );
}

export default StreamKeyButton;
