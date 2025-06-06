import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { EyeClosedIcon, EyeIcon } from "lucide-react";

import registerUser from "../../../services/api/registerUser";

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

const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome precisa ter no mínimo 3 caracteres")
    .transform((name) => {
      return capitalizeText(name);
    }),
  email: z
    .string()
    .email("Email inválido")
    .transform((email) => email.toLowerCase()),
  password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const eyeClosedRef = useRef(null);
  const eyeOpenedRef = useRef(null);

  const handleSeePassword = (event) => {
    const passwordInput = document.getElementById("password-input-2");

    eyeClosedRef.current.classList.toggle("hidden");
    eyeOpenedRef.current.classList.toggle("hidden");

    switch (event.target) {
      case eyeClosedRef.current:
        passwordInput.type = "text";
        break;
      case eyeOpenedRef.current:
        passwordInput.type = "password";
        break;
    }
  };

  const onSubmit = async (newUser) => {
    try {
      await registerUser(newUser);
      navigate("/panel");
    } catch (error) {
      const { message } = JSON.parse(error.message);

      if (message.includes("email")) {
        setError("email", {
          type: "manual",
          message: "Email já cadastrado",
        });
      }

      if (message.includes("name")) {
        setError("name", {
          type: "manual",
          message: "Nome de usuário já está em uso",
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-[540px] flex flex-col items-center text-center gap-8 p-8">
        <h3 className="text-4xl text-zinc-300">Registrar uma conta</h3>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col items-center gap-8">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Nome"
                  autoComplete="off"
                  className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                />
                {errors.name && (
                  <span className="text-rose-500">{errors.name.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                />
                {errors.email && (
                  <span className="text-rose-500">{errors.email.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    {...register("password")}
                    id="password-input-2"
                    type="password"
                    placeholder="Senha"
                    autoComplete="off"
                    className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  />
                  <div
                    ref={eyeClosedRef}
                    onClick={(event) => handleSeePassword(event)}
                    className="absolute top-4 right-4 hover:cursor-pointer"
                  >
                    <EyeClosedIcon className="text-zinc-400 pointer-events-none" />
                  </div>
                  <div
                    ref={eyeOpenedRef}
                    onClick={(event) => handleSeePassword(event)}
                    className="hidden absolute top-3 right-4 hover:cursor-pointer"
                  >
                    <EyeIcon className="text-zinc-400 pointer-events-none" />
                  </div>
                </div>
                {errors.password && (
                  <span className="text-rose-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                type="submit"
                value="Registrar"
                className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
