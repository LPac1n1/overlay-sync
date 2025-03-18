import Canvas from "./components/Canvas.jsx";
import DropArea from "./components/DropArea.jsx";
import Screen from "./components/Screen.jsx";

function App() {
  return (
    <div className="w-screen h-screen relative flex justify-between items-center bg-zinc-200">
      <Canvas />
      <DropArea />
      <Screen />
    </div>
  );
}

export default App;
