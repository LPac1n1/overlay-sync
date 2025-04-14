import { EyeIcon, EyeOffIcon } from "lucide-react";

function ShowForStream({ show, setShow }) {
  return (
    <div
      onClick={() => setShow((prev) => !prev)}
      className="w-full h-full flex justify-center items-center hover:bg-zinc-800 rounded-lg p-2 transition-all hover:!cursor-pointer z-50"
    >
      {show ? (
        <EyeIcon className="text-zinc-400 z-40 pointer-events-none" />
      ) : (
        <EyeOffIcon className="text-zinc-400 z-40 pointer-events-none" />
      )}
    </div>
  );
}

export default ShowForStream;
