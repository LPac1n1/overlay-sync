import Canvas from "./components/Canvas.jsx";
import Screen from "./components/Screen.jsx";

function App() {
  return (
    <div
      id="container"
      className=" w-screen h-screen bg-zinc-200 flex justify-center items-center relative"
    >
      <Canvas />
      <Screen />
    </div>
  );
}

export default App;
