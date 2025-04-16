import { useState } from "react";
import Modal from "../../../../components/Modal";
import { KeyRoundIcon } from "lucide-react";

function StreamKeyButton({ streamKey }) {
  const [isStreamKeyModalOpen, setIsStreamKeyModalOpen] = useState(false);

  const onStreamKeyButtonClick = () => {
    console.log("teste");
    setIsStreamKeyModalOpen(true);
  };

  const onModalClose = () => {
    setIsStreamKeyModalOpen(false);
  };

  return (
    <>
      <button
        onClick={onStreamKeyButtonClick}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => event.preventDefault()}
        className="bg-zinc-900 rounded-full p-4 z-50 transition-all hover:bg-zinc-700 hover:!cursor-pointer"
      >
        <KeyRoundIcon className="text-zinc-300 z-40 pointer-events-none" />
      </button>

      <Modal isOpen={isStreamKeyModalOpen} onClose={onModalClose}>
        <div className="flex flex-col items-center gap-6">
          <div className="w-full text-center flex flex-col gap-4">
            <p className="text-lg text-zinc-400">Server:</p>
            <div className="flex">
              <input
                disabled
                type="text"
                value="rtmp://localhost/live"
                className={`w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-s-lg px-2 py-2`}
              />

              <input
                onClick={(event) => {
                  navigator.clipboard.writeText(
                    event.target.parentNode.firstChild.value
                  );
                }}
                type="button"
                value="Copiar"
                className="h-10 bg-zinc-700 text-zinc-400 outline-none rounded-e-lg px-2 py-2 transition-all hover:bg-zinc-600 hover:cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full text-center flex flex-col gap-4">
            <p className="text-lg text-zinc-400">Chave da trasmissão:</p>
            <div className="flex">
              <input
                disabled
                type="password"
                value={streamKey}
                className={`w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-s-lg px-2 py-2`}
              />

              <input
                onClick={(event) => {
                  navigator.clipboard.writeText(
                    event.target.parentNode.firstChild.value
                  );
                }}
                type="button"
                value="Copiar"
                className="h-10 bg-zinc-700 text-zinc-400 outline-none rounded-e-lg px-2 py-2 transition-all hover:bg-zinc-600 hover:cursor-pointer"
              />
            </div>
          </div>

          <div>
            <button
              onClick={onModalClose}
              className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default StreamKeyButton;
