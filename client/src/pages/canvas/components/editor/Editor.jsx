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

    const files = Array.from(event.dataTransfer.files);
    files.forEach((file) => {
      if (!file.type.startsWith("image")) {
        return alert("Insira uma imagem válida!");
      }

      const imageDOM = createRef();
      const imageURL = URL.createObjectURL(file);

      console.log(imageURL);

      const image = new Image();
      image.onload = () => {
        setImages((prev) => {
          const width = image.width / 5;
          const height = image.height / 5;

          return [
            ...prev,
            {
              id: `image-${uuid()}`,
              url: imageURL,
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
      image.src = imageURL;
    });
  };

  return (
    <div
      onMouseDown={(event) => onEditorMouseDown(event)}
      onDragOver={(event) => event.preventDefault(event)}
      onDrop={(event) => onEditorDrop(event)}
      id="editor"
      className="absolute w-screen h-full z-40"
    >
      <Images />
    </div>
  );
}

export default Editor;
