import {
  UserIcon,
  BrushIcon,
  LockKeyholeIcon,
  BringToFrontIcon,
  DoorOpenIcon,
} from "lucide-react";

function AccountSidebar({ selectedSection, setSelectedSection }) {
  const setSelected = (event) => {
    setSelectedSection(event.target.dataset.section);
  };

  return (
    <aside className="w-1/6 h-full">
      <ul className="flex flex-col gap-4">
        <div className="space-y-2">
          <li
            onClick={setSelected}
            className={`group flex items-center gap-2 hover:cursor-pointer hover:text-zinc-200 transition-all ${
              selectedSection === "account" && "text-zinc-200"
            }`}
            data-section="account"
          >
            <UserIcon
              className={`w-4 h-4 group-hover:text-zinc-400 transition-all pointer-events-none ${
                selectedSection === "account"
                  ? "text-zinc-400"
                  : "text-zinc-500"
              }`}
            />
            Conta
          </li>
          <li
            onClick={setSelected}
            className={`group flex items-center gap-2 hover:cursor-pointer hover:text-zinc-200 transition-all ${
              selectedSection === "appearance" && "text-zinc-200"
            }`}
            data-section="appearance"
          >
            <BrushIcon
              className={`w-4 h-4 group-hover:text-zinc-400 transition-all pointer-events-none ${
                selectedSection === "appearance"
                  ? "text-zinc-400"
                  : "text-zinc-500"
              }`}
            />
            Aparência
          </li>
        </div>

        <div className="w-full space-y-2">
          <span className="block w-full h-[0.1rem] rounded bg-zinc-700/50"></span>
          <p className="text-sm text-zinc-500">Acesso</p>
        </div>

        <div className="space-y-2">
          <li
            onClick={setSelected}
            className={`group flex items-center gap-2 hover:cursor-pointer hover:text-zinc-200 transition-all ${
              selectedSection === "password" && "text-zinc-200"
            }`}
            data-section="password"
          >
            <LockKeyholeIcon
              className={`w-4 h-4 group-hover:text-zinc-400 transition-all pointer-events-none ${
                selectedSection === "password"
                  ? "text-zinc-400"
                  : "text-zinc-500"
              }`}
            />
            Senha
          </li>
          <li
            onClick={setSelected}
            className={`group flex items-center gap-2 hover:cursor-pointer hover:text-zinc-200 transition-all ${
              selectedSection === "overlays" && "text-zinc-200"
            }`}
            data-section="overlays"
          >
            <BringToFrontIcon
              className={`w-4 h-4 group-hover:text-zinc-400 transition-all pointer-events-none ${
                selectedSection === "overlays"
                  ? "text-zinc-400"
                  : "text-zinc-500"
              }`}
            />
            Overlays
          </li>
        </div>
      </ul>
    </aside>
  );
}

export default AccountSidebar;
