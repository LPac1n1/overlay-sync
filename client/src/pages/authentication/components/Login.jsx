import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useRef } from "react";

function Login() {
  const passwordInputRef = useRef(null);
  const eyeClosedRef = useRef(null);
  const eyeOpenedRef = useRef(null);

  const handleSeePassword = (event) => {
    eyeClosedRef.current.classList.toggle("hidden");
    eyeOpenedRef.current.classList.toggle("hidden");

    console.log(event.target, passwordInputRef.current);

    switch (event.target) {
      case eyeClosedRef.current:
        passwordInputRef.current.type = "text";
        break;
      case eyeOpenedRef.current:
        passwordInputRef.current.type = "password";
        break;
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-[540px] flex flex-col items-center text-center gap-8 p-8">
        <h3 className="text-4xl text-zinc-300">Entrar na conta</h3>
        <form className="w-full">
          <div className="flex flex-col items-center gap-8">
            <div className="w-full flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                className="w-full h-12 bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
              />
              <div className="relative">
                <input
                  ref={passwordInputRef}
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
            </div>
            <div>
              <input
                type="button"
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
