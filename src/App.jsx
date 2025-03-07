import { useState } from "react";
import Canvas from "./components/Canvas.jsx";
import Screen from "./components/Screen.jsx";

function App() {
  let [images, setImages] = useState([]);

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageReader = new FileReader();
      imageReader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const newImage = {
            id: images.length + 1,
            url: imageReader.result,
            name: file.name,
            dimensions: {
              width: image.width / 4,
              height: image.height / 4,
            },
          };

          setImages([...images, newImage]);
        };
        image.src = imageReader.result;
      };
      imageReader.readAsDataURL(file);
    } else {
      alert("Por favor, insira uma imagem válida.");
    }
  };

  return (
    <div className="w-screen h-screen bg-zinc-200 flex justify-center items-center relative">
      <Canvas images={images} onDragOver={onDragOver} onDrop={onDrop} />
      <Screen />
    </div>
  );
}

export default App;
