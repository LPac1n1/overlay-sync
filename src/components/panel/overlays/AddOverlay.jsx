import { useRef } from "react";

import { PlusIcon } from "lucide-react";

function AddOverlay() {
  const addOverlayWidgetRef = useRef(null);
  const addOverlayFormRef = useRef(null);
  const plusIconRef = useRef(null);

  const spinIcon = () => {
    plusIconRef.current.classList.toggle("rotate-45");
  };

  const toggleColor = () => {
    const isGreen = plusIconRef.current.classList.contains("text-emerald-700");
    const isRed = plusIconRef.current.classList.contains("text-rose-700");

    if (isGreen) {
      plusIconRef.current.classList.replace(
        "text-emerald-700",
        "text-rose-700"
      );

      addOverlayWidgetRef.current.classList.replace(
        "hover:bg-emerald-900/15",
        "hover:bg-rose-900/15"
      );

      addOverlayWidgetRef.current.classList.replace(
        "border-emerald-600/25",
        "border-rose-600/25"
      );

      return;
    }

    if (isRed) {
      plusIconRef.current.classList.replace(
        "text-rose-700",
        "text-emerald-700"
      );

      addOverlayWidgetRef.current.classList.replace(
        "hover:bg-rose-900/15",
        "hover:bg-emerald-900/15"
      );

      addOverlayWidgetRef.current.classList.replace(
        "border-rose-600/25",
        "border-emerald-600/25"
      );
    }

    return;
  };

  const showOrHideForm = () => {
    const isHidden = addOverlayFormRef.current.classList.contains("hidden");

    if (isHidden) {
      addOverlayFormRef.current.classList.toggle("hidden");
      setTimeout(() => {
        addOverlayFormRef.current.classList.replace("opacity-0", "opacity-100");
      }, 100);
      return;
    }

    if (!isHidden) {
      addOverlayFormRef.current.classList.replace("opacity-100", "opacity-0");
      setTimeout(() => {
        addOverlayFormRef.current.classList.toggle("hidden");
      }, 200);
    }
  };

  const handleAddOverlayClick = () => {
    spinIcon();
    toggleColor();
    showOrHideForm();
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-lg text-zinc-500">Adicionar nova overlay</p>
      </div>

      <div className="h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-8">
        <div className="col-span-1">
          <div
            ref={addOverlayWidgetRef}
            onClick={handleAddOverlayClick}
            className="max-w-full min-h-72 md:max-w-80 bg-zinc-900/50 border-2 border-emerald-600/25 rounded-2xl flex justify-center items-center duration-300 ease-in-out hover:bg-emerald-900/15 hover:cursor-pointer"
          >
            <div>
              <PlusIcon
                ref={plusIconRef}
                className="w-10 h-10 text-emerald-700 duration-300 ease-in-out"
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <form
            ref={addOverlayFormRef}
            className="hidden w-full h-full duration-100 ease-linear opacity-0"
          >
            <div className="h-full flex flex-col items-center gap-8">
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col justify-center gap-2">
                  <p className="text-lg text-zinc-400">Canal</p>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full h-12 bg-zinc-700 text-zinc-400 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  />
                </div>

                <div className="flex flex-col justify-center gap-2">
                  <p className="text-lg text-zinc-400">Plataforma</p>
                  <input
                    type="text"
                    value="Twitch"
                    autoComplete="off"
                    className="pointer-events-none w-full h-12 bg-zinc-700/50 text-zinc-400/50 outline-none border-2 border-zinc-700/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <input
                    type="button"
                    value="Criar overlay"
                    className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddOverlay;
