import Login from "./Login";
import Register from "./Register";
import Swap from "./Swap";

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
