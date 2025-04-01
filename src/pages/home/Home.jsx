import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-zinc-800 flex justify-center items-center">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <h4 className="text-2xl text-zinc-400">Bem-vindo ao</h4>
          <h1 className="text-8xl text-zinc-300">Streamelay</h1>
        </div>

        <div>
          <button
            onClick={() => navigate("/authentication")}
            className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
