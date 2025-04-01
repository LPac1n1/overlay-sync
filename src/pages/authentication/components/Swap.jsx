import { useRef } from "react";

function Swap() {
  const swap = useRef(null);

  const swapToRegisterButtonRef = useRef(null);
  const swapToLoginButtonRef = useRef(null);

  const registerTextRef = useRef(null);
  const loginTextRef = useRef(null);

  const moveSwap = (side) => {
    switch (side) {
      case "left":
        swap.current.style.width = "100%";
        setTimeout(() => {
          swap.current.style.left = 0;
          swap.current.style.right = "auto";
          swap.current.style.width = "50%";
        }, 300);
        break;
      case "right":
        swap.current.style.width = "100%";
        setTimeout(() => {
          swap.current.style.right = 0;
          swap.current.style.left = "auto";
          swap.current.style.width = "50%";
        }, 300);
        break;
    }
  };

  const textTransition = (type) => {
    switch (type) {
      case "login":
        registerTextRef.current.style.opacity = "0%";
        setTimeout(() => {
          registerTextRef.current.classList.replace("flex", "hidden");
          loginTextRef.current.classList.replace("hidden", "flex");
        }, 300);
        setTimeout(() => {
          loginTextRef.current.style.opacity = "100%";
        }, 400);
        break;
      case "register":
        loginTextRef.current.style.opacity = "0%";
        setTimeout(() => {
          loginTextRef.current.classList.replace("flex", "hidden");
          registerTextRef.current.classList.replace("hidden", "flex");
        }, 300);
        setTimeout(() => {
          registerTextRef.current.style.opacity = "100%";
        }, 400);
        break;
    }
  };

  const handleSwap = (event) => {
    switch (event.target) {
      case swapToRegisterButtonRef.current:
        textTransition("login");
        moveSwap("left");
        break;

      case swapToLoginButtonRef.current:
        textTransition("register");
        moveSwap("right");
        break;
    }
  };

  return (
    <div
      ref={swap}
      className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900 duration-300 ease-in-out"
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full max-w-[540px] text-center p-8">
          <div
            ref={registerTextRef}
            className="flex flex-col gap-8 duration-300 ease-linear"
          >
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-4xl text-zinc-400">Ainda não tem conta?</h3>
              <p className="text-lg text-zinc-600">
                Clique no botão abaixo para criar uma.
              </p>
            </div>

            <div>
              <button
                ref={swapToRegisterButtonRef}
                onClick={(event) => handleSwap(event)}
                className="text-zinc-400 bg-zinc-800 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700"
              >
                Fazer registro
              </button>
            </div>
          </div>

          <div
            ref={loginTextRef}
            className="hidden flex-col gap-8 duration-300 ease-linear opacity-0"
          >
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-4xl text-zinc-400">Já tem conta?</h3>
              <p className="text-lg text-zinc-600">
                Clique no botão abaixo para entrar.
              </p>
            </div>

            <div>
              <button
                ref={swapToLoginButtonRef}
                onClick={(event) => handleSwap(event)}
                className="text-zinc-400 bg-zinc-800 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700"
              >
                Fazer login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
