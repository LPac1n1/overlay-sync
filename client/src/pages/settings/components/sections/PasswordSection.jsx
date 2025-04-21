import { motion } from "framer-motion";

// import changeUserPassword from "../../../../services/api/changeUserPassword";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// const passwordFormSchema = z.object({
//   password: z
//     .string()
//     .min(3, "O nome de usuário precisa ter no mínimo 3 caracteres"),
// });

function PasswordSection() {
  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(passwordFormSchema),
  // });

  return (
    <motion.section
      key={"password"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full"
    >
      <div className="w-full h-full flex flex-col gap-8">
        <div className="space-y-4">
          <h3 className="text-3xl">Senha</h3>
          <span className="block w-full h-[0.1rem] bg-zinc-700/50"></span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-2xl">Alterar senha</h4>
            <p className="text-zinc-500">
              Para sua segurança, insira sua senha atual e crie uma nova senha.
            </p>
          </div>
        </div>

        <form noValidate className="w-full max-w-md space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label>Senha atual</label>
              <input
                type="password"
                placeholder="Digite sua senha atual"
                className="w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
              />
            </div>

            <div className="space-y-2">
              <label>Nova senha</label>
              <input
                type="password"
                placeholder="Digite sua nova senha"
                className="w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
              />
            </div>

            <div className="space-y-2">
              <label>Confirmar nova senha</label>
              <input
                type="password"
                placeholder="Confirme sua nova senha"
                className="w-full h-10 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
              />
            </div>
          </div>

          <div>
            <input
              type="submit"
              value="Atualizar senha"
              className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
            />
          </div>
        </form>
      </div>
    </motion.section>
  );
}

export default PasswordSection;
