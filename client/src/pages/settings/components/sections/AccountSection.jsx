import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { UserRoundIcon, ReplaceIcon, XIcon, CheckIcon } from "lucide-react";

import getUser from "../../../../services/api/getUser.js";
import changeUsername from "../../../../services/api/changeUsername.js";
import deleteUser from "../../../../services/api/deleteUser.js";

import Popover from "../../../../components/Popover.jsx";
import Modal from "../../../../components/Modal.jsx";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const capitalizeText = (text) => {
  return text
    .trim()
    .split(" ")
    .map((word) => {
      return word[0]
        .toLocaleUpperCase()
        .concat(word.substring(1).toLocaleLowerCase());
    })
    .join(" ");
};

const userNameFormSchema = z.object({
  username: z
    .string()
    .min(3, "O nome de usuário precisa ter no mínimo 3 caracteres")
    .transform((name) => {
      return capitalizeText(name);
    }),
});

function AccountHeader() {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl">Conta</h3>
      <span className="block w-full h-[0.1rem] bg-zinc-700/50"></span>
    </div>
  );
}

function AccountProfileForm({ userId, userName, userEmail }) {
  const [isSubmited, setIsSubmited] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userNameFormSchema),
  });

  const onSubmit = async (newUserName) => {
    if (newUserName.username === userName) return;

    try {
      await changeUsername(userId, newUserName.username);
      setIsSubmited(true);
    } catch (error) {
      const { message } = JSON.parse(error.message);

      if (message.includes("alread exists"))
        return setError("username", {
          type: "manual",
          message: "Nome de usuário já está em uso",
        });
    }
  };

  useEffect(() => {
    setValue("username", userName);
  }, [setValue, userName]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md space-y-8"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label>Nome de usuário</label>
          <div className="relative flex justify-center items-center">
            <input
              {...register("username")}
              disabled={isSubmited && true}
              type="text"
              placeholder="Digite seu nome de usuário"
              className={`w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2 ${
                isSubmited && "opacity-75"
              }`}
            ></input>
            {isSubmited && (
              <CheckIcon className="absolute right-4 text-emerald-600" />
            )}
          </div>
          {errors.username && (
            <span className="text-rose-500">{errors.username.message}</span>
          )}
        </div>

        <div className="space-y-2 opacity-75">
          <label>Email</label>
          <input
            disabled
            type="email"
            value={userEmail}
            className="w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={`text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer ${
            isSubmited && "pointer-events-none"
          } ${isSubmited && "opacity-75"}`}
        >
          Salvar alterações
        </button>
      </div>
    </form>
  );
}

function DeleteAccount({ userId }) {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const navigate = useNavigate();

  const deleteAccount = () => {
    const deleteUserData = async () => {
      await deleteUser(userId);
      return navigate("/");
    };

    deleteUserData();
  };

  const onCloseDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        <span className="block w-full h-[0.15rem] bg-zinc-700/50"></span>
        <div className="space-y-2">
          <h4 className="text-2xl text-red-500">Excluir conta</h4>
          <p className="text-zinc-500">
            Esta ação é irreversível. Ao excluir sua conta, todos os seus dados
            serão permanentemente removidos.
          </p>
        </div>
      </div>

      <div className="w-full">
        <button
          onClick={() => setIsDeleteAccountModalOpen(true)}
          className="text-zinc-300 bg-red-600 px-4 py-2 rounded-lg z-10 transition-all hover:bg-red-500"
        >
          Excluir conta
        </button>
      </div>

      <Modal
        isOpen={isDeleteAccountModalOpen}
        onClose={onCloseDeleteAccountModal}
      >
        <div className="text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-2xl text-zinc-300">
                Tem certeza que deseja excluir sua conta para sempre?
              </h4>
            </div>

            <div className="flex justify-center items-center flex-wrap gap-4">
              <button
                onClick={onCloseDeleteAccountModal}
                className="text-zinc-400 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-zinc-700/50"
              >
                Cancelar
              </button>

              <button
                onClick={deleteAccount}
                className="text-zinc-300 bg-red-600 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-red-500"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

function AccountAvatar() {
  const [isRemoveAvatarModalOpen, setIsRemoveAvatarModalOpen] = useState(false);

  const removePicture = () => {};

  const onCloseRemovePictureModal = () => {
    setIsRemoveAvatarModalOpen(false);
  };

  const popoverContent = (
    <div className="flex flex-col">
      <button className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-cyan-200/15">
        <ReplaceIcon className="w-4 h-4 text-cyan-500" />
        <p>Trocar</p>
      </button>
      <button
        onClick={() => setIsRemoveAvatarModalOpen(true)}
        className="text-zinc-400 text-sm flex items-center gap-2 p-4 transition-all hover:bg-rose-200/15"
      >
        <XIcon className="w-4 h-4 text-rose-500" />
        <p className="text-zinc-400">Remover</p>
      </button>
    </div>
  );

  return (
    <>
      <aside className="w-full h-fit col-span-1 order-1 lg:col-span-1 lg:order-2 flex justify-center">
        <div className="relative">
          <div className="w-64 h-64 bg-zinc-900 flex justify-center items-center rounded-full">
            <UserRoundIcon className="w-32 h-32 stroke-[0.075rem] text-zinc-400 pointer-events-none" />
          </div>

          <div className="relative">
            <Popover content={popoverContent} distance=" -top-1 !right-auto">
              <button className="absolute left-0 bottom-4 text-zinc-400 bg-zinc-800 border-2 border-zinc-700 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700">
                Editar foto
              </button>
            </Popover>
          </div>
        </div>
      </aside>

      <Modal
        isOpen={isRemoveAvatarModalOpen}
        onClose={onCloseRemovePictureModal}
      >
        <div className="text-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-2xl text-zinc-300">Tem certeza?</h4>
              <p className="text-lg text-zinc-400">
                Você ficará sem foto de perfil até que coloque outra novamente.
              </p>
            </div>

            <div className="flex justify-center items-center flex-wrap gap-4">
              <button
                onClick={onCloseRemovePictureModal}
                className="text-zinc-400 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-zinc-700/50"
              >
                Cancelar
              </button>

              <button
                onClick={removePicture}
                className="text-zinc-300 bg-rose-600 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:bg-rose-500"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

function AccountSection() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    profilePicute: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUserData();
  }, []);

  return (
    <motion.section
      key={"account"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-fit"
    >
      <div className="w-full h-fit flex flex-col gap-8">
        <AccountHeader />

        <div className="w-full h-fit grid grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 gap-4">
          <div className="w-full h-fit col-span-1 order-2 lg:col-span-2 lg:order-1 space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-2xl">Informações do perfil</h4>
                <p className="text-zinc-500">
                  Atualize os dados da sua conta, como nome e nome de usuário.
                </p>
              </div>
            </div>

            <AccountProfileForm
              userId={user.id}
              userName={user.name}
              userEmail={user.email}
            />

            <DeleteAccount userId={user.id} />
          </div>

          <AccountAvatar />
        </div>
      </div>
    </motion.section>
  );
}

export default AccountSection;
