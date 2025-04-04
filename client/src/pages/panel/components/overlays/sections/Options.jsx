import JoinOverlayWidget from "../widgets/JoinOverlayWidget";
import CreateOverlayWidget from "../widgets/createOverlayWidget";

function Options() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-8">
        <JoinOverlayWidget />
        <CreateOverlayWidget />

        {/* <div className="col-span-1">
          <form>
            <div className="h-full flex flex-col items-center gap-8">
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col justify-center gap-2">
                  <p className="text-lg text-zinc-400">Canal</p>
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full h-12 bg-zinc-700 text-zinc-400 outline-none border-2 border-zinc-600/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  />
                </div>

                <div className="flex flex-col justify-center gap-2">
                  <p className="text-lg text-zinc-400">Plataforma</p>
                  <input
                    type="text"
                    value="Twitch"
                    autoComplete="off"
                    className="pointer-events-none w-full h-12 bg-zinc-700/50 text-zinc-400/50 outline-none border-2 border-zinc-700/25 focus:border-zinc-600 rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <input
                    type="button"
                    value="Criar overlay"
                    className="text-zinc-400 bg-zinc-900 px-4 py-2 rounded-lg z-10 transition-all hover:bg-zinc-700 hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
}

export default Options;
