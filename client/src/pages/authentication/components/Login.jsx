import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { EyeClosedIcon, EyeIcon } from "lucide-react";

import loginUser from "../../../services/api/loginUser";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .transform((email) => {
      return email.toLowerCase();
    }),
  password: z.string().min(1, "Senha não pode ser vazia"),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const eyeClosedRef = useRef(null);
  const eyeOpenedRef = useRef(null);

  const handleSeePassword = (event) => {
    const passwordInput = document.getElementById("password-input-1");

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

  const onSubmit = async (oldUser) => {
    try {
      await loginUser(oldUser);
      navigate("/panel");
    } catch (error) {
      const { message } = JSON.parse(error.message);

      if (message.includes("invalid")) {
        setError("login", {
          type: "manual",
          message: "Email ou senha inválidos",
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-[540px] flex flex-col items-center text-center gap-8 p-8">
        <h3 className="text-4xl text-zinc-300">Entrar na conta</h3>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col items-center gap-8">
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  {...register("email")}
                  onInput={() => {
                    clearErrors("email");
                    clearErrors("login");
                  }}
                />
                {errors.email && (
                  <span className="text-rose-500">{errors.email.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    id="password-input-1"
                    type="password"
                    placeholder="Senha"
                    autoComplete="off"
                    className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                    {...register("password")}
                    onInput={() => {
                      clearErrors("email");
                      clearErrors("login");
                    }}
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

                {errors.login && (
                  <span className="text-rose-500">{errors.login.message}</span>
                )}
              </div>
            </div>
            <div>
              <input
                id="login-submit"
                type="submit"
                value="Entrar"
                className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
