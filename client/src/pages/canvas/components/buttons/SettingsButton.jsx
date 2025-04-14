import { SettingsIcon } from "lucide-react";

function SettingsButton() {
  return (
    <button
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => event.preventDefault()}
      className="bg-zinc-900 rounded-full p-4 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
    >
      <SettingsIcon className="text-zinc-300 z-40 pointer-events-none" />
    </button>
  );
}

export default SettingsButton;
