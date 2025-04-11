import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../../../../components/Modal";

import deleteOverlay from "../../../../../services/api/deleteOverlay";

import { EllipsisIcon, PlayIcon } from "lucide-react";

function OverlayWidget({ overlay, onOverlayDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const excludeOverlay = (id) => {
    setIsModalOpen(false);

    setTimeout(async () => {
      await deleteOverlay(id);
      await onOverlayDelete();
    }, 200);
  };

  return (
    <div>
      <div className="relative max-w-full min-h-72 md:max-w-80 bg-zinc-900 border-2 border-zinc-950/25 rounded-2xl flex flex-col justify-center items-center overflow-hidden">
        <div
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-6 z-20 hover:cursor-pointer"
        >
          <EllipsisIcon className="text-zinc-400"></EllipsisIcon>
        </div>

        <div className="absolute top-0 w-full h-3/4 bg-zinc-950 flex justify-center items-center overflow-hidden z-10">
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent from-10% via-zinc-900/80 to-zinc-900 z-10" />

          {overlay.channel_picture !== null ? (
            <img
              src={overlay.channel_picture}
              className="absolute w-full h-full object-cover opacity-50"
            />
          ) : (
            <div className="absolute w-full h-full bg-zinc-800 flex justify-center items-center opacity-75">
              <PlayIcon className="absolute top-4 w-48 h-48 text-zinc-700"></PlayIcon>
            </div>
          )}
        </div>

        <div className="absolute w-full h-full flex flex-col justify-end items-center gap-8 pb-8 z-10">
          <h3 className="text-3xl text-zinc-300">{overlay.channel_name}</h3>
          <button
            onClick={() => navigate(`/canvas/${overlay.canvas_route}`)}
            className="text-zinc-400 bg-zinc-800/75 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-zinc-700/75"
          >
            Ir para o canvas
          </button>

          {/* <div className="flex justify-center items-center">
            <div className="w-10 h-10 bg-rose-500 flex justify-center items-center rounded-full overflow-hidden">
              <UserRoundIcon className="w-6 h-6 text-zinc-800" />
            </div>
            <div className="w-10 h-10 bg-blue-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden">
              <UserRoundIcon className="w-6 h-6 text-zinc-800" />
            </div>
            <div className="w-10 h-10 bg-orange-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden">
              <UserRoundIcon className="w-6 h-6 text-zinc-800" />
            </div>
            <div className="w-10 h-10 bg-yellow-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden">
              <UserRoundIcon className="w-6 h-6 text-zinc-800" />
            </div>
            <div className="w-10 h-10 bg-green-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden">
              <UserRoundIcon className="w-6 h-6 text-zinc-800" />
            </div>
            <div className="relative w-10 h-10 flex justify-center items-center rounded-full overflow-hidden">
              <p className="absolute text-2xl text-zinc-300 z-10">+1</p>
            </div>
          </div> */}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <h4 className="text-2xl text-zinc-300">Tem certeza?</h4>
              <p className="text-lg text-zinc-400">
                Você ira excluir a overlay para sempre.
              </p>
            </div>

            <div className="space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-zinc-700/50"
              >
                Cancelar
              </button>

              <button
                onClick={() => excludeOverlay(overlay.id)}
                className="text-zinc-300 bg-rose-600 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-rose-500"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OverlayWidget;
