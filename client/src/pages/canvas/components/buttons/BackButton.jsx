import { useNavigate } from "react-router-dom";

import { ArrowLeftIcon } from "lucide-react";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/panel")}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => event.preventDefault()}
      className="bg-zinc-900 rounded-full p-4 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
    >
      <ArrowLeftIcon className="text-zinc-300 z-40 pointer-events-none" />
    </button>
  );
}

export default BackButton;
