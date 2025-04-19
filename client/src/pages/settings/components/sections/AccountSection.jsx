import { motion } from "framer-motion";

import { UserRoundIcon } from "lucide-react";

function AccountSection() {
  return (
    <motion.section
      key={"account"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full"
    >
      <div className="w-full h-full flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="text-3xl">Conta</h3>
          <span className="block w-full h-[0.1rem] bg-zinc-700/50"></span>
        </div>

        <div className="w-full h-full flex gap-4">
          <div className="w-2/3 h-full space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-2xl">Informações do perfil</h4>
                <p className="text-zinc-500">
                  Atualize os dados da sua conta, como nome e nome de usuário.
                </p>
              </div>
            </div>

            <form noValidate className="w-full max-w-96 space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label>Nome de usuário</label>
                  <input
                    type="text"
                    placeholder="Digite seu nome de usuário"
                    className="w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <label>Nome</label>
                  <input
                    type="text"
                    placeholder="Digite seu nome completo"
                    className="w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <label>Email</label>
                  <input
                    disabled
                    type="email"
                    placeholder="Seu email"
                    className="w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div>
                <input
                  type="submit"
                  value="Salvar alterações"
                  className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
                />
              </div>
            </form>

            <div className="space-y-4">
              <span className="block w-full h-[0.15rem] bg-zinc-700/50"></span>
              <div className="space-y-2">
                <h4 className="text-2xl text-red-500">Excluir conta</h4>
                <p className="text-zinc-500">
                  Esta ação é irreversível. Ao excluir sua conta, todos os seus
                  dados serão permanentemente removidos.
                </p>
              </div>
            </div>

            <div className="w-full">
              <button className="text-zinc-300 bg-red-600 px-4 py-2 rounded-lg z-10 transition-all hover:bg-red-500">
                Excluir conta
              </button>
            </div>
          </div>

          <aside className="w-1/3 h-full flex justify-center items-center">
            <div className="relative">
              <div className="w-64 h-64 bg-zinc-900 flex justify-center items-center rounded-full">
                <UserRoundIcon className="w-32 h-32 stroke-[0.075rem] text-zinc-400 pointer events-none" />
              </div>

              <button className="absolute left-0 bottom-4 text-zinc-400 bg-zinc-800 border-2 border-zinc-700 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700">
                Editar foto
              </button>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  );
}

export default AccountSection;
