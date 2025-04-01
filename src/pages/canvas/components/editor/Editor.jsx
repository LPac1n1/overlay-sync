import { useContext, createRef } from "react";
import { v4 as uuid } from "uuid";

import { ImagesContext } from "../../../../context/ImagesContext";

import Images from "./Images";

function Editor() {
  const { images, setImages } = useContext(ImagesContext);

  const onEditorMouseDown = (event) => {
    if (
      event.target.id.startsWith("image") ||
      event.target.id.endsWith("selection")
    )
      return;

    // Check if there is any image selected.
    let hasImageSelected = null;
    images.map((image) => image.isSelected).includes(true)
      ? (hasImageSelected = true)
      : (hasImageSelected = false);

    // If so, unselect it.
    if (hasImageSelected) {
      return setImages((prev) =>
        prev.map((image) => ({ ...image, isSelected: false }))
      );
    }

    // If you don't have it, nothing happens.
    return;
  };

  const onEditorDrop = (event) => {
    event.preventDefault();

    const { clientX, clientY } = event;
    event.target.style.pointerEvents = "none";
    const behindElement = document.elementFromPoint(clientX, clientY);
    event.target.style.pointerEvents = "auto";

    if (behindElement.id !== "drop-area") return;

    const files = Array.from(event.dataTransfer.files);
    files.forEach((file) => {
      if (!file.type.startsWith("image")) {
        return alert("Insira uma imagem válida!");
      }

      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const imageDOM = createRef();

          setImages((prev) => {
            const width = image.width / 5;
            const height = image.height / 5;

            return [
              ...prev,
              {
                id: `image-${uuid()}`,
                url: reader.result,
                name: file.name,
                html: imageDOM,
                dimensions: { width, height },
                position: {
                  x: event.clientX - width / 2,
                  y: event.clientY - height / 2,
                },
                isSelected: false,
                zIndex: prev.length + 1,
              },
            ];
          });
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      onMouseDown={(event) => onEditorMouseDown(event)}
      onDragOver={(event) => event.preventDefault(event)}
      onDrop={(event) => onEditorDrop(event)}
      id="editor"
      className="absolute w-screen h-screen z-40"
    >
      <Images />
    </div>
  );
}

export default Editor;
