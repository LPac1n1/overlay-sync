import { useState } from "react";

import Modal from "../../../../../components/Modal.jsx";

import { PlusIcon } from "lucide-react";

function CreateOverlayWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="col-span-1">
      <div
        onClick={() => setIsModalOpen(true)}
        className="max-w-full min-h-72 md:max-w-80 bg-zinc-900/50 border-2 border-zinc-600/25 rounded-2xl flex justify-center items-center transition-all hover:bg-zinc-700/50 hover:cursor-pointer"
      >
        <div>
          <PlusIcon className="w-10 h-10 text-zinc-600" />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form className="w-full">
          <div className="flex flex-col items-center gap-8">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-lg text-zinc-400">Nome do canal</p>
                <input
                  type="text"
                  autoComplete="off"
                  className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg text-zinc-400">Plataforma</p>
                <input
                  type="text"
                  placeholder="Ex: Twitch"
                  autoComplete="off"
                  className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg text-zinc-400">Link RTMP</p>
                <input
                  type="text"
                  autoComplete="off"
                  className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div>
              <input
                type="button"
                value="Criar overlay"
                className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CreateOverlayWidget;
