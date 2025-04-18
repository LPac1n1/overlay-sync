import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { v4 as uuid } from "uuid";

import {
  EllipsisIcon,
  TicketIcon,
  Trash2Icon,
  DoorOpenIcon,
  CircleCheckBigIcon,
  PlayIcon,
  UserRoundIcon,
} from "lucide-react";

import createInvite from "../../../../../services/api/createInvite";
import deleteOverlay from "../../../../../services/api/deleteOverlay";
import leaveOverlay from "../../../../../services/api/leaveOverlay";

import getOverlayUsers from "../../../../../services/api/getOverlayUsers";

import Modal from "../../../../../components/Modal";
import Popover from "../../../../../components/Popover";

function OverlayWidget({ overlay, overlayRole, onOverlaysChange }) {
  const [show, setShow] = useState(true);
  const [overlayUsers, setOverlayUsers] = useState([]);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const [isInviteCreated, setIsInviteCreated] = useState(false);
  const inviteInput = useRef(null);
  const inviteButton = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getOverlayUsers(overlay.id);
        return setOverlayUsers(users);
      } catch (error) {
        const { message } = JSON.parse(error.message);
        console.error(message);
      }
    };

    getUsers();
  }, [overlay.id]);

  const generateInvite = async () => {
    try {
      inviteButton.current.disabled = true;
      inviteButton.current.classList.remove("hover:bg-emerald-500");

      const invite_token = uuid();
      const invite = await createInvite({
        invite_token,
        overlay_id: overlay.id,
      });
      inviteInput.current.value = invite.token;

      setIsInviteCreated(true);
    } catch (error) {
      const { message } = JSON.parse(error.message);

      if (message.includes("permission denied")) {
        setIsInviteCreated(false);
      }
    }
  };

  const onCloseInviteModal = () => {
    setIsInviteModalOpen(false);
    setIsInviteCreated(false);

    if (inviteButton.current && inviteInput.current) {
      setTimeout(() => {
        inviteButton.current.disabled = false;
        inviteButton.current.classList.add("hover:bg-emerald-500");
        inviteInput.current.value = "";
      }, 200);
    }
  };

  const onCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onCloseLeaveModal = () => {
    setIsLeaveModalOpen(false);
  };

  const excludeOverlay = (id) => {
    onCloseDeleteModal();
    setShow(false);

    setTimeout(async () => {
      await deleteOverlay(id);
      await onOverlaysChange();
    }, 200);
  };

  const exitOverlay = (id) => {
    onCloseLeaveModal();
    setShow(false);

    setTimeout(async () => {
      await leaveOverlay(id);
      await onOverlaysChange();
    }, 200);
  };

  const content =
    overlayRole === "creator" ? (
      <div className="flex flex-col">
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-emerald-200/15"
        >
          <TicketIcon className="w-4 h-4 text-emerald-500" /> <p>Convite</p>
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-red-200/15"
        >
          <Trash2Icon className="w-4 h-4 text-red-500" /> <p>Excluir</p>
        </button>
      </div>
    ) : overlayRole === "admin" ? (
      <div className="flex flex-col">
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-emerald-200/15"
        >
          <TicketIcon className="w-4 h-4 text-emerald-500" /> <p>Convite</p>
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-red-200/15"
        >
          <Trash2Icon className="w-4 h-4 text-red-500" /> <p>Excluir</p>
        </button>
        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-rose-200/15"
        >
          <DoorOpenIcon className="w-4 h-4 text-rose-500" /> <p>Sair</p>
        </button>
      </div>
    ) : (
      <div className="flex flex-col">
        <button
          onClick={() => setIsLeaveModalOpen(true)}
          className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-rose-200/15"
        >
          <DoorOpenIcon className="w-4 h-4 text-rose-500" /> <p>Sair</p>
        </button>
      </div>
    );

  return (
    <div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative max-w-full min-h-72 md:max-w-80 bg-zinc-900 border-2 border-zinc-950/25 rounded-2xl flex flex-col justify-center items-center overflow-hidden"
          >
            <div className="absolute top-4 right-6">
              <Popover content={content}>
                <div className="z-20 hover:cursor-pointer">
                  <EllipsisIcon className="text-zinc-400"></EllipsisIcon>
                </div>
              </Popover>
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

              {overlayUsers.length > 1 && (
                <div className="flex justify-center items-center">
                  {overlayUsers.map((user, index) => {
                    if (user.user_picture !== null) {
                      if (index < 1) {
                        return (
                          <div
                            key={user.id}
                            className="w-8 h-8 bg-zinc-500 flex justify-center items-center rounded-full overflow-hidden"
                          >
                            <UserRoundIcon className="w-4 h-4 text-zinc-900" />
                          </div>
                        );
                      }

                      if (index >= 1 && index < 8) {
                        return (
                          <div
                            key={user.id}
                            className="w-8 h-8 bg-zinc-500 flex justify-center items-center rounded-full -ml-4 overflow-hidden"
                          >
                            <UserRoundIcon className="w-4 h-4 text-zinc-900" />
                          </div>
                        );
                      }

                      if (index === 9) {
                        <div className="relative w-8 h-8 flex justify-center items-center rounded-full overflow-hidden">
                          <p className="absolute text-xl text-zinc-300 z-10">
                            +{overlayUsers.length - 9}
                          </p>
                        </div>;
                      }
                    }
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal isOpen={isInviteModalOpen} onClose={onCloseInviteModal}>
        <div className="text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-2xl text-zinc-300">Convidar um amigo</h4>
              <p className="text-lg text-zinc-400">
                Clique no botão para gerar um código de convite.
              </p>
            </div>

            <div className="flex">
              <input
                ref={inviteInput}
                disabled
                type="text"
                placeholder="Código de convite"
                className={`w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 ${
                  isInviteCreated ? "rounded-s-lg" : "rounded-lg"
                } px-2 py-2`}
              />
              {isInviteCreated && (
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
              )}
            </div>

            <div className="flex justify-center items-center flex-wrap gap-4">
              <button
                onClick={onCloseInviteModal}
                className="text-zinc-400 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-zinc-700/50"
              >
                {isInviteCreated ? "Fechar" : "Cancelar"}
              </button>

              <button
                ref={inviteButton}
                onClick={() => {
                  generateInvite();
                  setIsInviteCreated(true);
                }}
                className="text-zinc-300 bg-emerald-600 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-emerald-500"
              >
                {isInviteCreated ? (
                  <CircleCheckBigIcon className="text-emerald-900" />
                ) : (
                  "Gerar convite"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <div className="text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-2xl text-zinc-300">Tem certeza?</h4>
              <p className="text-lg text-zinc-400">
                Você ira excluir a overlay para sempre.
              </p>
            </div>

            <div className="flex justify-center items-center flex-wrap gap-4">
              <button
                onClick={onCloseDeleteModal}
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

      <Modal isOpen={isLeaveModalOpen} onClose={onCloseLeaveModal}>
        <div className="text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-2xl text-zinc-300">
                Tem certeza que deseja sair?
              </h4>
              <p className="text-lg text-zinc-400">
                Você não poderá participar mais da overlay até que seja
                convidado novamente.
              </p>
            </div>

            <div className="flex justify-center items-center flex-wrap gap-4">
              <button
                onClick={onCloseLeaveModal}
                className="text-zinc-400 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-zinc-700/50"
              >
                Cancelar
              </button>

              <button
                onClick={() => exitOverlay(overlay.id)}
                className="text-zinc-300 bg-rose-600 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-rose-500"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default OverlayWidget;
