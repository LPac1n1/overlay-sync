import Login from "./sections/Login.jsx";
import Register from "./sections/Register.jsx";
import Swap from "./sections/Swap.jsx";

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
