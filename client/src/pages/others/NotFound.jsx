import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout classes={"h-full flex justify-center items-center h-8"}>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl text-zinc-400">Erro 404</h2>
          <h1 className="text-8xl text-center font-semibold leading-tight text-zinc-300">
            Página não <br /> encontrada :(
          </h1>
        </div>

        <div>
          <button
            onClick={() => navigate("/")}
            className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700"
          >
            Página inicial
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
