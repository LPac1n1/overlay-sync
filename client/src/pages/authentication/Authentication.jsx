import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Swap from "./components/Swap.jsx";

function Authentication() {
  return (
    <div className="relative w-screen h-screen bg-zinc-800 flex justify-center items-center">
      <Login />
      <Register />
      <Swap />
    </div>
  );
}

export default Authentication;
