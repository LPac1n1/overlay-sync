import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-zinc-800 flex justify-center items-center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-zinc-400">Erro 404</h2>
          <h1 className="text-8xl text-zinc-300">Página não encontrada :(</h1>
        </div>

        <div>
          <button
            onClick={() => navigate("/")}
            className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
