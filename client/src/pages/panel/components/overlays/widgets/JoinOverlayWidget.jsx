import { useState } from "react";

import { TicketsIcon } from "lucide-react";

import applyInvite from "../../../../../services/api/applyInvite.js";

import Modal from "../../../../../components/Modal.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const inviteFormSchema = z.object({
  invite: z.string().min(1, "O código de convite não pode ser vazio"),
});

function JoinOverlayWidget({ reloadOverlays }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    resolver: zodResolver(inviteFormSchema),
  });

  const onSubmit = async (inviteToken) => {
    try {
      const invite_token = inviteToken.invite;
      await applyInvite({ invite_token });
      onModalClose();
      reloadOverlays();
    } catch (error) {
      try {
        const { message } = JSON.parse(error.message);

        if (message.includes("token does not exist")) {
          return setError("invite", {
            type: "custom",
            message: "Código inexistente, usado ou expirado",
          });
        }

        if (message.includes("already own this overlay")) {
          return setError("invite", {
            type: "custom",
            message: "Você já está nessa overlay",
          });
        }

        return setError("invite", {
          type: "custom",
          message: "Erro ao usar o convite",
        });
      } catch {
        setError("invite", {
          type: "custom",
          message: "Erro inesperado",
        });
      }
    }
  };

  const onModalClose = () => {
    setIsModalOpen(false);
    clearErrors("invite");
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
          <TicketsIcon className="w-10 h-10 text-zinc-600" />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col items-center gap-6">
            <div className="w-full text-center flex flex-col gap-4">
              <p className="text-lg text-zinc-400">Código de convite</p>
              <input
                type="text"
                className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                {...register("invite")}
              />
              {errors.invite && (
                <span className="text-rose-500">{errors.invite.message}</span>
              )}
            </div>

            <div>
              <input
                type="submit"
                value="Utilizar"
                className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default JoinOverlayWidget;
