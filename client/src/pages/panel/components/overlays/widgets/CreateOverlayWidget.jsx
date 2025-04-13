import { useState } from "react";

import { PlusIcon } from "lucide-react";

import generateStreamKey from "../../../../../utils/generateStreamKey.js";
import generateCanvasRoute from "../../../../../utils/generateCanvasRoute.js";

import createOverlay from "../../../../../services/api/createOverlay.js";

import Modal from "../../../../../components/Modal.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const channelNameFormSchema = z.object({
  channel_name: z.string().min(1, "O nome do canal não pode ser vazio"),
});

function CreateOverlayWidget({ reloadOverlays }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm({
    resolver: zodResolver(channelNameFormSchema),
  });

  const onSubmit = async (name) => {
    const { channel_name } = name;
    const stream_key = generateStreamKey();
    const canvas_route = generateCanvasRoute();

    const createdOverlay = {
      channel_name,
      channel_picture: null,
      stream_key,
      canvas_route,
    };

    try {
      await createOverlay(createdOverlay);
      onModalClose();
      reloadOverlays();
    } catch (error) {
      console.error(error.message);
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    clearErrors("channel_name");
    setTimeout(() => {
      reset();
    }, 200);
  };

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

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col items-center gap-6">
            <div className="w-full flex flex-col gap-4">
              <div className="text-center flex flex-col gap-2">
                <p className="text-lg text-zinc-400">Nome do canal</p>
                <input
                  id="channel-name-input"
                  type="text"
                  autoComplete="off"
                  className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  {...register("channel_name")}
                />
                {errors.channel_name && (
                  <span className="text-rose-500">
                    {errors.channel_name.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                type="submit"
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
